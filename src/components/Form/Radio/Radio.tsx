import { cx } from '@emotion/css';
import React, { useCallback, useRef, useState } from 'react';
import { MergeProps, ThemeProps } from '../../../types';
import { useAccessibility } from '../../../context/Accessibility/useAccessibility';
import { useThemeId } from '../../../context/Theme';
import { useComponentId } from '../../../hooks/useComponentId';
import { makeCombineRefs } from '../../../utils';
import { Label } from '../Label';
import styles from './styles/Radio.module.css';
import sizeStyles from './styles/RadioSizes.module.css';

export type RadioValue = string | number;

export type RadioSize =
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

export type LocalRadioProps<V extends RadioValue = string> = ThemeProps & {
  checked?: boolean;
  children?: React.ReactChild | React.ReactFragment;
  className?: string;
  disabled?: boolean;
  /** Sets the width to 100% */
  full?: boolean;
  id?: string;
  inputStyle?: React.CSSProperties;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, value: V) => void;
  persistEvents?: boolean;
  reverse?: boolean;
  size?: RadioSize;
  style?: React.CSSProperties;
  unthemed?: boolean;
  validity?: 'danger';
  value?: V;
  /** The primary variant uses a solid background fill for a checked item */
  variant?: 'primary' | 'secondary';
};

export type RadioProps<V extends RadioValue = string> = MergeProps<
  Omit<React.ComponentProps<'input'>, 'onBlur' | 'onFocus' | 'ref' | 'tabIndex' | 'type'>,
  LocalRadioProps<V>
> & {
  labelProps?: Omit<
    Omit<React.ComponentPropsWithoutRef<'label'>, 'htmlFor' | 'onFocus' | 'tabIndex'>,
    keyof LocalRadioProps<V>
  >;
};

export function RadioBase<V extends RadioValue = string>(
  {
    checked = false,
    children,
    className,
    contrast = false,
    disabled = false,
    full = false,
    id,
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
  }: RadioProps<V>,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
): React.ReactElement<RadioProps<V>, 'label'> {
  const accessible = useAccessibility();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const themeId = useThemeId(initThemeId);
  const [focused, setFocused] = useState(false);
  const { componentId } = useComponentId(id);
  const color = contrast ? 'contrast' : 'primary';

  const combineRefs = makeCombineRefs<HTMLInputElement>(inputRef, forwardedRef);

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
        styles.radio,
        sizeStyles[`radio--${size}`],
        color && !unthemed && styles[`radio--${color}`],
        full && styles['radio--full'],
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
      htmlFor={componentId}
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
          type="radio"
          value={value}
          {...props}
        />
      </div>
      {children && (
        <Label<'div'>
          as="div"
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

/**
 * The radio component contains both a form radio button
 * and a label.
 *
 * The checked state should be stored outside of this
 * component and is updated by the `onChange` callback.
 */
export const Radio = React.forwardRef(RadioBase) as <V extends RadioValue = string>(
  p: RadioProps<V> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement<HTMLLabelElement>;

// note that the base element cannot have a displayName because it breaks Storybook
(Radio as React.NamedExoticComponent).displayName = 'Radio';
