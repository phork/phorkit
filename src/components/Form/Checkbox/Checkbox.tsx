import { cx } from '@emotion/css';
import React, { useCallback, useRef, useState } from 'react';
import { MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
import { useComponentId } from '../../../hooks/useComponentId';
import { useThemeId } from '../../../hooks/useThemeId';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { Label } from '../Label';
import styles from './styles/Checkbox.module.css';

export interface LocalCheckboxProps extends ThemeProps {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  grouped?: 'stacked' | 'inline';
  id?: string;
  indeterminate?: boolean;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, value: string | number) => void;
  persistEvents?: boolean;
  unthemed?: boolean;
  validity?: 'danger';
  value?: string | number;
}

export type CheckboxProps = MergeElementPropsWithoutRef<'label', LocalCheckboxProps>;

export function CheckboxBase(
  {
    checked,
    children,
    className,
    contrast,
    disabled,
    grouped,
    id,
    indeterminate,
    name,
    onChange,
    persistEvents,
    themeId: initThemeId,
    unthemed,
    validity,
    value,
    ...props
  }: CheckboxProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
): React.ReactElement<CheckboxProps, 'label'> {
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
        onChange(event, event.target.checked, value);
      }
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
        styles.checkbox,
        validity && styles[`is-${validity}`],
        checked && styles['checkbox--checked'],
        indeterminate && styles['checkbox--indeterminate'],
        focused && styles['checkbox--focused'],
        themeId && !unthemed && styles[`checkbox--${themeId}`],
        color && styles[`checkbox--${color}`],
        grouped && styles[`checkbox--grouped--${grouped}`],
        className,
      )}
      onFocus={forwardFocus}
      tabIndex={focused ? -1 : 0}
      {...props}
    >
      <input
        checked={checked}
        className={styles.checkboxInput}
        disabled={disabled}
        id={generateComponentId()}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        ref={combineRefs}
        tabIndex={-1}
        type="checkbox"
        value={value}
        data-type={typeof value}
      />
      <Label
        className={styles.checkboxLabel}
        contrast={contrast}
        disabled={disabled}
        focused={focused}
        strength="standard"
        themeId={themeId}
        muted={!checked && !indeterminate}
      >
        {children}
      </Label>
    </label>
  );
}

export const Checkbox = React.forwardRef(CheckboxBase);
CheckboxBase.displayName = 'CheckboxBase';
