import { cx } from '@emotion/css';
import React, { useCallback, useRef, useState } from 'react';
import { MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
import { useComponentId } from '../../../hooks/useComponentId';
import { useThemeId } from '../../../hooks/useThemeId';
import { makeCombineRefs } from '../../../utils';
import { Label } from '../Label/Label';
import styles from './styles/Toggle.module.css';

export interface LocalToggleProps extends ThemeProps {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  persistEvents?: boolean;
  reverse?: boolean;
  size?: 'small';
  /** A stronger version of the toggle that doesn't have its colors muted to match the other form inputs */
  standalone?: boolean;
  value?: string;
}

export type ToggleProps = MergeElementPropsWithoutRef<'label', LocalToggleProps> & {
  ref?: React.Ref<HTMLInputElement>;
};

export function ToggleBase(
  {
    checked,
    children,
    className,
    contrast,
    disabled,
    id,
    name,
    onChange,
    persistEvents,
    // this allows us to spread the rest of the props without typescript erroring
    ref: ignoredRef,
    reverse,
    size,
    standalone,
    themeId: initThemeId,
    value,
    ...props
  }: ToggleProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
): React.ReactElement<ToggleProps, 'label'> {
  const inputRef = useRef<HTMLInputElement>(null!);
  const themeId = useThemeId(initThemeId);
  const [focused, setFocused] = useState(false);
  const color = contrast ? 'contrast' : 'primary';
  const { generateComponentId } = useComponentId();

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
      htmlFor={generateComponentId(id)}
      className={cx(
        styles.toggle,
        checked && styles['is-checked'],
        disabled && styles['is-disabled'],
        focused && styles['is-focused'],
        reverse && styles['toggle--reverse'],
        standalone && styles['toggle--standalone'],
        size && styles[`toggle--${size}`],
        themeId && styles[`toggle--${themeId}`],
        color && styles[`toggle--${color}`],
        className,
      )}
      onFocus={forwardFocus}
      tabIndex={focused ? -1 : 0}
      {...props}
    >
      <input
        checked={checked}
        className={styles.toggleInput}
        disabled={disabled}
        id={generateComponentId(id)}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        ref={combineRefs}
        tabIndex={-1}
        type="checkbox"
        value={value}
      />
      <div className={styles.toggleInput} />
      <Label
        className={styles.toggleLabel}
        contrast={contrast}
        disabled={disabled}
        focused={focused}
        strength="standard"
        themeId={themeId}
        muted={!checked}
      >
        {children}
      </Label>
    </label>
  );
}

export const Toggle = React.forwardRef(ToggleBase);
