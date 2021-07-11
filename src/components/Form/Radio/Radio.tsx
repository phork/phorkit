import { cx } from '@emotion/css';
import React, { useCallback, useRef, useState } from 'react';
import { MergeProps, ThemeProps } from '../../../types';
import { useAccessibility } from '../../../context/Accessibility/useAccessibility';
import { useComponentId } from '../../../hooks/useComponentId';
import { useThemeId } from '../../../hooks/useThemeId';
import { makeCombineRefs } from '../../../utils';
import { Label } from '../Label';
import styles from './styles/Radio.module.css';

export interface LocalRadioProps extends ThemeProps {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  full?: boolean;
  grouped?: 'stacked' | 'inline';
  id?: string;
  inputStyle?: React.CSSProperties;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, value: string | number) => void;
  persistEvents?: boolean;
  reverse?: boolean;
  style?: React.CSSProperties;
  unthemed?: boolean;
  validity?: 'danger';
  value?: string | number;
  variant?: 'primary' | 'secondary';
}

export type RadioProps = MergeProps<
  Omit<React.ComponentPropsWithoutRef<'input'>, 'onBlur' | 'onFocus' | 'tabIndex' | 'type'>,
  LocalRadioProps
> & {
  labelProps?: Omit<
    Omit<React.ComponentPropsWithoutRef<'label'>, 'htmlFor' | 'onFocus' | 'tabIndex'>,
    keyof LocalRadioProps
  >;
};

export type RadioRef = React.ForwardedRef<HTMLInputElement>;

export function RadioBase(
  {
    checked = false,
    children,
    className,
    contrast = false,
    disabled = false,
    full = false,
    grouped,
    id,
    inputStyle,
    labelProps,
    name,
    onChange,
    persistEvents = false,
    reverse = false,
    style,
    themeId: initThemeId,
    unthemed = false,
    validity,
    value,
    variant = 'primary',
    ...props
  }: RadioProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
): React.ReactElement<RadioProps, 'label'> {
  const accessible = useAccessibility();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const themeId = useThemeId(initThemeId);
  const [focused, setFocused] = useState(false);
  const { generateComponentId } = useComponentId(id);
  const color = contrast ? 'contrast' : 'primary';

  const combineRefs = makeCombineRefs<HTMLInputElement>(inputRef, forwardedRef);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      persistEvents && event.persist();
      onChange && onChange(event, event.target.checked, event.target.value);
    },
    [onChange, persistEvents],
  );

  const handleBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => setFocused(false), [setFocused]);
  const handleFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => setFocused(true), [setFocused]);
  const forwardFocus = useCallback<React.FocusEventHandler<HTMLLabelElement>>(() => inputRef.current?.focus(), []);

  return (
    <label
      htmlFor={generateComponentId()}
      className={cx(
        styles.radio,
        color && !unthemed && styles[`radio--${color}`],
        full && styles['radio--full'],
        grouped && styles[`radio--grouped--${grouped}`],
        reverse && styles['radio--reverse'],
        themeId && !unthemed && styles[`radio--${themeId}`],
        variant && styles[`radio--${variant}`],
        checked && styles['is-checked'],
        !checked && styles['is-unchecked'],
        accessible && styles['is-accessible'],
        disabled && styles['is-disabled'],
        focused && styles['is-focused'],
        validity && styles[`is-${validity}`],
        className,
      )}
      onFocus={forwardFocus}
      style={style}
      tabIndex={focused || disabled ? -1 : 0}
      {...labelProps}
    >
      <div className={styles.radioInputContainer}>
        <div className={styles.radioInputContainerFocusRing} />
        <input
          checked={checked}
          className={styles.radioInput}
          disabled={disabled}
          id={generateComponentId()}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          ref={combineRefs}
          style={inputStyle}
          tabIndex={-1}
          type="radio"
          value={value}
          {...props}
        />
      </div>
      {children && (
        <Label
          className={styles.radioLabel}
          contrast={contrast}
          disabled={disabled}
          focused={focused}
          muted={!checked}
          strength="standard"
          themeId={themeId}
        >
          {children}
        </Label>
      )}
    </label>
  );
}

export const Radio = React.forwardRef(RadioBase);

RadioBase.displayName = 'RadioBase';
Radio.displayName = 'Radio';
