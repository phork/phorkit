import { cx } from '@emotion/css';
import React, { useCallback, useRef, useState } from 'react';
import { MergeProps, ThemeProps } from '../../../types';
import { useAccessibility } from '../../../context/Accessibility/useAccessibility';
import { useThemeId } from '../../../context/Theme';
import { useComponentId } from '../../../hooks/useComponentId';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { Label } from '../Label';
import styles from './styles/Checkbox.module.css';
import sizeStyles from './styles/CheckboxSizes.module.css';

export type CheckboxValue = string | number | undefined;

export type CheckboxSize =
  | 'medium'
  | 'large'
  | 'xlarge'
  | '2xlarge'
  | '3xlarge'
  | '4xlarge'
  | '5xlarge'
  | '6xlarge'
  | '7xlarge'
  | '8xlarge';

export type LocalCheckboxProps<V extends CheckboxValue = string> = ThemeProps & {
  checked?: boolean;
  children?: React.ReactChild | React.ReactFragment;
  className?: string;
  disabled?: boolean;
  /** Sets the width to 100% */
  full?: boolean;
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
  /** The primary variant uses a solid background fill for a checked item */
  variant?: 'primary' | 'secondary';
};

export type CheckboxProps<V extends CheckboxValue = string> = MergeProps<
  Omit<React.ComponentProps<'input'>, 'onBlur' | 'onFocus' | 'ref' | 'tabIndex' | 'type'>,
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
  const { componentId } = useComponentId(id);
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
      htmlFor={componentId}
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
          id={componentId}
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
        <Label<'div'>
          as="div"
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

/**
 * The checkbox component contains both a form checkbox
 * and a label. A checkbox can be checked, unchecked or
 * indeterminate.
 *
 * The checked state should be stored outside of this
 * component and is updated by the `onChange` callback.
 */
export const Checkbox = React.forwardRef(CheckboxBase) as <V extends CheckboxValue = string>(
  p: CheckboxProps<V> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement<HTMLLabelElement>;

// note that the base element cannot have a displayName because it breaks Storybook
(Checkbox as React.NamedExoticComponent).displayName = 'Checkbox';
