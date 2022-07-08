import { cx } from '@emotion/css';
import React, { useCallback, useRef, useState } from 'react';
import { MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
import { useAccessibility } from '../../../context/Accessibility';
import { useThemeId } from '../../../context/Theme';
import { useComponentId } from '../../../hooks/useComponentId';
import { makeCombineRefs } from '../../../utils';
import { Label } from '../Label/Label';
import styles from './styles/Toggle.module.css';

export type LocalToggleProps = ThemeProps & {
  checked?: boolean;
  children?: React.ReactChild | React.ReactFragment;
  className?: string;
  disabled?: boolean;
  full?: boolean;
  id?: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  persistEvents?: boolean;
  reverse?: boolean;
  size?: 'small';
  style?: React.CSSProperties;
  value?: string;
};

export type ToggleProps = MergeElementPropsWithoutRef<'label', LocalToggleProps>;
export type ToggleRef = React.ForwardedRef<HTMLInputElement>;

export function ToggleBase(
  {
    checked = false,
    children,
    className,
    contrast = false,
    disabled = false,
    full = false,
    id,
    name,
    onChange,
    persistEvents,
    reverse = false,
    size,
    themeId: initThemeId,
    unthemed = false,
    value,
    ...props
  }: ToggleProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
): React.ReactElement<ToggleProps> {
  const accessible = useAccessibility();
  const inputRef = useRef<HTMLInputElement>(null);
  const themeId = useThemeId(initThemeId);
  const [focused, setFocused] = useState(false);
  const color = contrast ? 'contrast' : 'primary';
  const { componentId } = useComponentId(id);

  const combineRefs = makeCombineRefs<HTMLInputElement>(inputRef, forwardedRef);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      persistEvents && event.persist();
      onChange && onChange(event, event.target.checked);
    },
    [onChange, persistEvents],
  );

  const handleBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => setFocused(false), [setFocused]);
  const handleFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => setFocused(true), [setFocused]);
  const forwardFocus = useCallback<React.FocusEventHandler<HTMLLabelElement>>(() => inputRef.current?.focus(), []);

  return (
    <label
      className={cx(
        styles.toggle,
        full && styles['toggle--full'],
        reverse && styles['toggle--reverse'],
        size && styles[`toggle--${size}`],
        themeId && !unthemed && styles[`toggle--${themeId}`],
        color && !unthemed && styles[`toggle--${color}`],
        accessible && styles['is-accessible'],
        checked && styles['is-checked'],
        disabled && styles['is-disabled'],
        focused && styles['is-focused'],
        className,
      )}
      htmlFor={componentId}
      onFocus={forwardFocus}
      tabIndex={focused || disabled ? -1 : 0}
      {...props}
    >
      <div className={styles.toggleInputContainer}>
        <div className={styles.toggleInputContainerFocusRing} />
        <input
          checked={checked}
          className={styles.toggleInput}
          disabled={disabled}
          id={componentId}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          ref={combineRefs}
          tabIndex={-1}
          type="checkbox"
          value={value}
        />
      </div>
      {children && (
        <Label<'div'>
          as="div"
          className={styles.toggleLabel}
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
 * The toggle component acts like a checkbox and looks
 * like an on/off switch. The children can be used as
 * an optional label.
 *
 * The checked state should be stored outside of this
 * component and is updated by the `onChange` callback.
 */
export const Toggle = React.forwardRef(ToggleBase);

// note that the base element cannot have a displayName because it breaks Storybook
Toggle.displayName = 'Toggle';
