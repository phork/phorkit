import React, { useCallback } from 'react';
import { MergeProps } from '../../../types';
import { useThemeId } from '../../../hooks/useThemeId';
import { Formbox, FormboxProps, FormboxValue } from '../Formbox/Formbox';

export interface LocalTextareaProps {
  height?: React.CSSProperties['height'];
  maxLength?: number;
  onChange?: (
    event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent,
    value: FormboxValue,
  ) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  value?: FormboxValue;
}

export type TextareaProps = MergeProps<Omit<FormboxProps<'label', 'textarea'>, 'as' | 'input'>, LocalTextareaProps>;

function TextareaBase(
  {
    autoFocus,
    className,
    contrast,
    disabled,
    height = 50,
    id,
    label,
    maxLength,
    name,
    onChange,
    placeholder,
    readOnly,
    silentReadOnly,
    themeId: initThemeId,
    transitional,
    type = 'text',
    validity,
    value = '',
    width,
    ...props
  }: TextareaProps,
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const themeId = useThemeId(initThemeId);
  const empty = !(type === 'number' ? Number.isFinite(value) : Boolean(value) || placeholder);

  const handleChange = useCallback(
    (event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent, value: string) => {
      if (!maxLength || !value || value.length <= maxLength) {
        onChange && onChange(event, type === 'number' ? parseFloat(value) : value);
      }
    },
    [maxLength, onChange, type],
  );

  const renderInput = (): React.ReactElement<HTMLTextAreaElement> => {
    return <textarea placeholder={placeholder} style={{ height }} />;
  };

  return (
    <Formbox<'label', 'textarea'>
      as="label"
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
      className={className}
      contrast={contrast}
      disabled={disabled}
      empty={empty}
      id={id}
      input={renderInput()}
      label={label}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      readOnly={readOnly}
      ref={forwardedRef}
      silentReadOnly={silentReadOnly}
      themeId={themeId}
      transitional={transitional}
      type="textarea"
      validity={validity}
      value={value}
      width={width}
      {...props}
    />
  );
}

export const Textarea = React.forwardRef(TextareaBase);
