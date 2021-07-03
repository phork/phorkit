import { cx } from '@emotion/css';
import React, { useCallback, useEffect, useState } from 'react';
import { MergeElementProps, ThemeProps } from '../../types';
import { useComponentId } from '../../hooks/useComponentId';
import { useThemeId } from '../../hooks/useThemeId';
import { FormboxVariant } from '../../components/Form/Formbox/types';
import { useListRegistry } from '../../components/ListRegistry';
import { TextboxGroupInput } from './TextboxGroupInput';
import styles from './styles/TextboxGroup.module.css';
import { useTextboxGroup, UseTextboxGroupOptions } from './useTextboxGroup';

export interface LocalTextboxGroup2FAProps extends ThemeProps {
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  length?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  value: string;
  variant?: FormboxVariant;
}

export type TextboxGroup2FAProps = MergeElementProps<'div', LocalTextboxGroup2FAProps>;

export function TextboxGroup2FA({
  className,
  inputClassName,
  inputStyle,
  length = 6,
  onChange,
  themeId: initThemeId,
  value = '',
  variant = 'outline',
  ...props
}: TextboxGroup2FAProps): React.ReactElement | null {
  const { generateComponentId } = useComponentId();
  const themeId = useThemeId(initThemeId);
  const { items } = useListRegistry<HTMLInputElement>();
  const [looper, setLooper] = useState<string[]>([]);

  // create an array of string IDs with 1 ID per digit
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

  const validator = useCallback(
    value => value.trim() !== '' && Number.isInteger(+value) && value >= 0 && value <= 9,
    [],
  );

  // fill any empty values with spaces so the values populate in the right box
  const handleChange = useCallback<NonNullable<UseTextboxGroupOptions['onChange']>>(
    (event, values) => {
      const value = looper.map(inputId => {
        const isEmpty = !values[inputId] || values[inputId] === '';
        return isEmpty ? ' ' : values[inputId];
      });

      onChange(event, value.join('').trimEnd());
    },
    [looper, onChange],
  );

  const inputProps = useTextboxGroup({
    onChange: handleChange,
    orderBy: looper,
    refs: items,
    validator,
    values,
  });

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
          key={generateComponentId(inputId)}
          maxLength={1}
          size={1}
          style={inputStyle}
          value={values[inputId] === ' ' ? '' : values[inputId]}
          variant={variant}
          width="auto"
          {...inputProps}
        />
      ))}
    </div>
  ) : null;
}

TextboxGroup2FA.displayName = 'TextboxGroup2FA';
