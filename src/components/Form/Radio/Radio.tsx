import { cx } from '@emotion/css';
import React, { useCallback, useRef, useState } from 'react';
import { MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
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

export type RadioProps = MergeElementPropsWithoutRef<'label', LocalRadioProps>;

export function RadioBase(
  {
    checked,
    children,
    className,
    contrast,
    disabled,
    grouped,
    id,
    name,
    onChange,
    persistEvents,
    themeId: initThemeId,
    unthemed,
    value,
    ...props
  }: RadioProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
): React.ReactElement<RadioProps, 'label'> {
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
        themeId && !unthemed && styles[`radio--${themeId}`],
        color && styles[`radio--${color}`],
        grouped && styles[`radio--grouped--${grouped}`],
        className,
      )}
      onFocus={forwardFocus}
      tabIndex={focused ? -1 : 0}
      {...props}
    >
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
      />
      <Label
        className={styles.radioLabel}
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

export const Radio = React.forwardRef(RadioBase);
