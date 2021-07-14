import { cx } from '@emotion/css';
import React, { useCallback, useRef, useState } from 'react';
import { MergeProps, ThemeProps } from '../../../types';
import { useAccessibility } from '../../../context/Accessibility/useAccessibility';
import { useComponentId } from '../../../hooks/useComponentId';
import { useThemeId } from '../../../hooks/useThemeId';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { Label } from '../Label';
import styles from './styles/Checkbox.module.css';
import sizeStyles from './styles/CheckboxSizes.module.css';

export type CheckboxValue = string | number | undefined;

export type CheckboxSize =
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'xxxlarge'
  | 'xxxxlarge'
  | 'xxxxxlarge'
  | 'xxxxxxlarge'
  | 'xxxxxxxlarge'
  | 'xxxxxxxxlarge';

export interface LocalCheckboxProps<V extends CheckboxValue = string> extends ThemeProps {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  full?: boolean;
  grouped?: 'stacked' | 'inline';
  id?: string;
  indeterminate?: boolean;
  inputStyle?: React.CSSProperties;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, value: V) => void;
  persistEvents?: boolean;
  reverse?: boolean;
  size?: CheckboxSize;
  style?: React.CSSProperties;
  unthemed?: boolean;
  validity?: 'danger';
  value?: V;
  variant?: 'primary' | 'secondary';
}

export type CheckboxProps<V extends CheckboxValue = string> = MergeProps<
  Omit<React.ComponentProps<'input'>, 'onBlur' | 'onFocus' | 'tabIndex' | 'type'>,
  LocalCheckboxProps<V>
> & {
  labelProps?: Omit<
    Omit<React.ComponentPropsWithoutRef<'label'>, 'htmlFor' | 'onFocus' | 'tabIndex'>,
    keyof LocalCheckboxProps<V>
  >;
};

export type CheckboxRef = React.ForwardedRef<HTMLInputElement>;

export function CheckboxBase<V extends CheckboxValue = string>(
  {
    checked = false,
    children,
    className,
    contrast = false,
    disabled,
    full = false,
    grouped,
    id,
    indeterminate = false,
    inputStyle,
    labelProps,
    name,
    onChange,
    persistEvents = false,
    reverse = false,
    size = 'large',
    style,
    themeId: initThemeId,
    unthemed = false,
    validity,
    value,
    variant = 'primary',
    ...props
  }: CheckboxProps<V>,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
): React.ReactElement<CheckboxProps<V>, 'label'> {
  const accessible = useAccessibility();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const themeId = useThemeId(initThemeId);
  const [focused, setFocused] = useState<boolean>(false);
  const { generateComponentId } = useComponentId(id);
  const color = contrast ? 'contrast' : 'primary';

  const combineRefs = makeCombineRefs<HTMLInputElement>(inputRef, forwardedRef, element => {
    element && (element.indeterminate = !!indeterminate);
  });

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      persistEvents && event.persist();
      if (onChange) {
        const value = event.target.getAttribute('data-type') === 'number' ? +event.target.value : event.target.value;
        onChange(event, event.target.checked, value as V);
      }
    },
    [onChange, persistEvents],
  );

  const handleBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => setFocused(false), [setFocused]);
  const handleFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => setFocused(true), [setFocused]);
  const forwardFocus = useCallback<React.FocusEventHandler<HTMLLabelElement>>(() => inputRef.current?.focus(), []);

  return (
    <label
      className={cx(
        styles.checkbox,
        sizeStyles[`checkbox--${size}`],
        color && !unthemed && styles[`checkbox--${color}`],
        full && styles['checkbox--full'],
        grouped && styles[`checkbox--grouped--${grouped}`],
        reverse && styles['checkbox--reverse'],
        themeId && !unthemed && styles[`checkbox--${themeId}`],
        variant && styles[`checkbox--${variant}`],
        checked && styles['is-checked'],
        indeterminate && styles['is-indeterminate'],
        !checked && !indeterminate && styles['is-unchecked'],
        accessible && styles['is-accessible'],
        disabled && styles['is-disabled'],
        focused && styles['is-focused'],
        validity && styles[`is-${validity}`],
        className,
      )}
      htmlFor={generateComponentId()}
      onFocus={forwardFocus}
      style={style}
      tabIndex={focused || disabled ? -1 : 0}
      {...labelProps}
    >
      <div className={styles.checkboxInputContainer}>
        <div className={styles.checkboxInputContainerFocusRing} />
        <input
          checked={checked}
          className={styles.checkboxInput}
          data-type={typeof value}
          disabled={disabled}
          id={generateComponentId()}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          ref={combineRefs}
          style={inputStyle}
          tabIndex={-1}
          type="checkbox"
          value={value}
          {...props}
        />
      </div>
      {children && (
        <Label
          className={styles.checkboxLabel}
          contrast={contrast}
          disabled={disabled}
          focused={focused}
          muted={!checked && !indeterminate}
          themeId={themeId}
        >
          {children}
        </Label>
      )}
    </label>
  );
}

export const Checkbox = React.forwardRef(CheckboxBase) as typeof CheckboxBase;

CheckboxBase.displayName = 'CheckboxBase';
Checkbox.displayName = 'Checkbox';
