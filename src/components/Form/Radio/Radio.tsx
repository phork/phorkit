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

export interface LocalRadioProps<V extends RadioValue = string> extends ThemeProps {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  full?: boolean;
  grouped?: 'stacked' | 'inline';
  id?: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, value: V) => void;
  persistEvents?: boolean;
  reverse?: boolean;
  size?: RadioSize;
  unthemed?: boolean;
  validity?: 'danger';
  value?: V;
  variant?: 'primary' | 'secondary';
}

export type RadioProps<V extends RadioValue = string> = MergeProps<
  Omit<React.ComponentProps<'input'>, 'onBlur' | 'onFocus' | 'tabIndex' | 'type'>,
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
    grouped,
    id,
    labelProps,
    name,
    onChange,
    persistEvents = false,
    reverse = false,
    size = 'large',
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
  const { generateComponentId } = useComponentId(id);
  const color = contrast ? 'contrast' : 'primary';

  const combineRefs = makeCombineRefs<HTMLInputElement>(inputRef, forwardedRef);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      persistEvents && event.persist();
      onChange && onChange(event, event.target.checked, event.target.value as V);
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
      htmlFor={generateComponentId()}
      onFocus={forwardFocus}
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

export const Radio = React.forwardRef(RadioBase) as typeof RadioBase;

RadioBase.displayName = 'RadioBase';
Radio.displayName = 'Radio';
