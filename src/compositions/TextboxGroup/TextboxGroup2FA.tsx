import { cx } from '@emotion/css';
import React, { useCallback, useEffect, useState } from 'react';
import { MergeElementProps, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { useComponentId } from '../../hooks/useComponentId';
import { FormboxSize, FormboxVariant } from '../../components/Form/Formbox/types';
import { useListRegistry } from '../../components/ListRegistry';
import styles from './styles/TextboxGroup.module.css';
import { TextboxGroupContainer } from './TextboxGroupContainer';
import { TextboxGroupInput } from './TextboxGroupInput';
import { useTextboxGroup, UseTextboxGroupProps } from './useTextboxGroup';

export type LocalTextboxGroup2FAProps = Omit<ThemeProps, 'contrast' | 'unthemed'> & {
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  inputWidth?: number | string;
  length?: number;
  onChange: (event: React.SyntheticEvent<HTMLElement>, value: string) => void;
  size?: FormboxSize;
  style?: React.CSSProperties;
  value: string;
  variant?: FormboxVariant;
};

export type TextboxGroup2FAProps = MergeElementProps<'div', LocalTextboxGroup2FAProps>;

function TextboxGroup2FAContent({
  className,
  id,
  inputClassName,
  inputStyle,
  inputWidth,
  length = 6,
  onChange,
  size,
  themeId: initThemeId,
  value = '',
  variant = 'outline',
  ...props
}: TextboxGroup2FAProps): JSX.Element | null {
  const { generateComponentId } = useComponentId(id);
  const themeId = useThemeId(initThemeId);
  const { items } = useListRegistry<HTMLInputElement>();
  const [looper, setLooper] = useState<string[]>([]);

  // create an array of input IDs with 1 ID per digit
  useEffect(() => {
    setLooper(
      Array(length)
        .fill(null)
        .map((_, i) => `${i}`),
    );
  }, [length]);

  // create a values object keyed by the inputId for the useTextboxGroup hook
  const values = looper.reduce((acc, inputId, i) => {
    acc[inputId] = value[i];
    return acc;
  }, {} as Record<string, string>);

  const validator = useCallback(value => {
    const isValid = value.trim() !== '' && Number.isInteger(+value) && value >= 0 && value <= 9;
    return { isValid, focusNext: isValid };
  }, []);

  // fill any empty values with spaces so the values populate in the right box
  const handleChange = useCallback<NonNullable<UseTextboxGroupProps['onChange']>>(
    (event, values) => {
      const value = looper.map(inputId => {
        const isEmpty = !values[inputId] || values[inputId] === '';
        return isEmpty ? ' ' : values[inputId];
      });

      onChange(event, value.join('').trimEnd());
    },
    [looper, onChange],
  );

  // select the input on focus so that typing a new value will replace it
  const handleInputFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(event => event.target.select(), []);

  const {
    changeFocus,
    onChange: ignoreOnChange,
    ...inputProps
  } = useTextboxGroup({
    onChange: handleChange,
    orderBy: looper,
    refs: items,
    validator,
    values,
  });

  // if every pasted char is valid then append the value
  const handlePaste = useCallback<React.ClipboardEventHandler<HTMLInputElement>>(
    event => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clipboard = (event.clipboardData || (window as any).clipboardData).getData('text');
      if (clipboard.split('').every(char => validator(char).isValid)) {
        const position = looper.findIndex(id => id === (event.target as HTMLInputElement).getAttribute('data-id'));
        const concatenated = (value.substring(0, position).padStart(position, ' ') + clipboard).substr(0, length);
        onChange(event, concatenated);
        changeFocus(Math.max(0, concatenated.length - 1) + '', 0);
      } else {
        event.preventDefault();
      }
    },
    [changeFocus, length, looper, onChange, validator, value],
  );

  return looper.length ? (
    <div
      className={cx(
        styles.textboxGroup,
        styles['textboxGroup--2fa'],
        styles[`textboxGroup--${variant}`],
        themeId && styles[`textboxGroup--${themeId}`],
        className,
      )}
      {...props}
    >
      {looper.map(inputId => (
        <TextboxGroupInput
          centered
          className={cx(
            styles['textboxGroupInput'],
            styles['textboxGroupInput--2fa'],
            styles[`textboxGroupInput--${variant}`],
            inputClassName,
          )}
          inputId={inputId}
          inputSize={1}
          key={generateComponentId(inputId)}
          maxLength={1}
          onInputFocus={handleInputFocus}
          onPaste={handlePaste}
          size={size}
          style={inputStyle}
          value={values[inputId] === ' ' ? '' : values[inputId]}
          variant={variant}
          width={inputWidth || 'unset'}
          {...inputProps}
        />
      ))}
    </div>
  ) : null;
}

/**
 * A group of inputs that can be used for a two factor
 * authentication number. The focus is automatically moved
 * to the next input when a valid character is entered.
 *
 * This uses the `Formbox` and `ListRegistry` components.
 */
export function TextboxGroup2FA(props: TextboxGroup2FAProps): JSX.Element | null {
  return (
    <TextboxGroupContainer>
      <TextboxGroup2FAContent {...props} />
    </TextboxGroupContainer>
  );
}

// note that the base element cannot have a displayName because it breaks Storybook
TextboxGroup2FA.displayName = 'TextboxGroup2FA';
