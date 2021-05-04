import { cx } from '@emotion/css';
import React, { useCallback, useMemo } from 'react';
import { MergeProps } from '../../../types';
import { useThemeId } from '../../../hooks/useThemeId';
import { ArrowDownIcon } from '../../../icons/ArrowDownIcon';
import { Formbox, FormboxProps, FormboxValue } from '../Formbox/Formbox';
import styles from './styles/Select.module.css';

export type SelectOption = {
  label?: string;
  value: FormboxValue;
};

export interface LocalSelectProps {
  multiple?: boolean;
  numeric?: boolean;
  onChange?: (
    event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent,
    value: FormboxValue | FormboxValue[],
  ) => void;
  options: SelectOption[];
  placeholder?: SelectOption;
  selectProps?: Omit<React.HTMLAttributes<HTMLSelectElement>, 'multiple'>;
  value?: FormboxValue | FormboxValue[];
}

export type SelectProps = MergeProps<
  Omit<FormboxProps<'label', 'input'>, 'as' | 'input' | 'placeholder' | 'type'>,
  LocalSelectProps
> & {
  ref?: React.Ref<HTMLSelectElement>;
};

export function SelectBase(
  {
    children,
    className,
    contrast,
    disabled,
    iconAfter,
    iconBefore,
    id,
    multiple,
    name,
    numeric,
    onChange,
    options,
    persistEvents,
    placeholder,
    readOnly,
    selectProps,
    silentReadOnly,
    themeId: initThemeId,
    transitional,
    unthemed,
    validity,
    value,
    width,
    ...props
  }: SelectProps,
  forwardedRef: React.ForwardedRef<HTMLSelectElement>,
) {
  const themeId = useThemeId(initThemeId);
  const empty = !(numeric
    ? Number.isFinite(value)
    : Boolean(multiple && Array.isArray(value) ? value && value.length : value) || placeholder);

  const handleChange = useCallback(
    (event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent, value: string) => {
      persistEvents && event.persist();
      const selectedOptions = Array.from((event.target as HTMLSelectElement).selectedOptions);

      const formattedValue = multiple ? (selectedOptions.map(o => o.value) as Array<FormboxValue>) : value;
      onChange && onChange(event, formattedValue);
    },
    [multiple, onChange, persistEvents],
  );

  const renderedPlaceholder = useMemo(() => {
    const value = (typeof placeholder === 'object' ? placeholder.value : undefined) || '';
    const label = (typeof placeholder === 'object' ? placeholder.label : placeholder) || '';
    return (label || transitional) && <option value={value}>{label}</option>;
  }, [placeholder, transitional]);

  const renderInput = (): React.ReactElement<HTMLSelectElement> => {
    return (
      <select
        className={cx(
          styles.selectInput,
          themeId && !unthemed && styles[`selectInput--${themeId}`],
          selectProps?.className,
        )}
        multiple={multiple}
        {...selectProps}
      >
        {renderedPlaceholder}

        {children ||
          options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
      </select>
    );
  };

  const getLabelByValue = (value: FormboxValue | undefined): FormboxValue | undefined => {
    return (options.find(option => option?.value === value) || ({} as SelectOption)).label;
  };

  const getLabelsByValue = (
    value: FormboxValue | FormboxValue[] | undefined,
  ): FormboxValue | FormboxValue[] | undefined => {
    if (Array.isArray(value)) {
      return value.reduce((acc, value: FormboxValue | undefined) => {
        const label = getLabelByValue(value);
        if (label !== undefined) {
          acc.push(label);
        }
        return acc;
      }, [] as FormboxValue[]);
    }
    return value !== undefined ? getLabelByValue(value) : undefined;
  };

  return (
    <Formbox<'label', 'select'>
      as="label"
      input={renderInput()}
      className={className}
      contrast={contrast}
      disabled={disabled}
      empty={empty}
      iconAfter={!multiple && !readOnly ? <ArrowDownIcon scale="xsmall" /> : undefined}
      iconBefore={iconBefore}
      id={id}
      name={name}
      onChange={handleChange}
      readOnly={readOnly}
      ref={forwardedRef}
      silentReadOnly={silentReadOnly}
      themeId={themeId}
      transitional={transitional}
      type="select"
      unthemed={unthemed}
      validity={validity}
      value={readOnly ? getLabelsByValue(value) : value}
      width={width}
      {...props}
    >
      {children}
    </Formbox>
  );
}

export const Select = React.forwardRef(SelectBase);
Select.displayName = 'Select';
