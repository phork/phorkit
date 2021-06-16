/* eslint-disable jsx-a11y/no-onchange */
import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { MergeProps } from '../../../types';
import { useThemeId } from '../../../hooks/useThemeId';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { ArrowDownIcon } from '../../../icons/ArrowDownIcon';
import { FormboxReadOnly, Formbox, FormboxProps, FormboxValue, FormboxInputWithFormatting } from '../Formbox';
import styles from './styles/Select.module.css';

export type SelectOption = {
  disabled?: boolean;
  label?: string;
  value: string;
};

export type SelectOptionPlaceholder = {
  /** If a placeholder is disabled it can't be clicked as a way to unselect the current value */
  disabled?: boolean;
  /** The placeholder label shown in the form view when the select is closed */
  label: string;
  /** The placeholder label shown in the select list*/
  optionLabel?: never;
  value?: string;
};

type SingleSelectProps = {
  multiple?: never;
  transitional?: boolean;
  value?: FormboxValue;
  values?: never;
};

type MultipleSelectProps = {
  multiple: true;
  transitional?: never;
  value?: never;
  values?: FormboxValue[];
};

export type LocalSelectProps = {
  children?: FormboxValue | FormboxValue[];
  name?: string;
  onChange?: (
    event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent,
    value?: FormboxValue | FormboxValue[],
  ) => void;
  options: SelectOption[];
  /** If an option cannot be unselected then a placeholder with `disabled: true` should be used */
  placeholder?: SelectOptionPlaceholder;
  selectProps?: Omit<React.HTMLAttributes<HTMLSelectElement>, 'multiple'>;
} & (SingleSelectProps | MultipleSelectProps);

export type SelectProps = MergeProps<
  Omit<FormboxProps, 'as' | 'children' | 'ref' | 'transitional' | 'type'>,
  LocalSelectProps
>;

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
    onChange,
    options,
    persistEvents,
    placeholder,
    readOnly,
    selectProps,
    themeId: initThemeId,
    transitional,
    unthemed,
    validity,
    value,
    values,
    width,
    ...props
  }: SelectProps,
  forwardedRef: React.ForwardedRef<HTMLSelectElement>,
) {
  const themeId = useThemeId(initThemeId);
  const inputRef = useRef<HTMLSelectElement>(null);
  const combineRefs = makeCombineRefs<HTMLSelectElement>(inputRef, forwardedRef);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>(
    event => {
      if (multiple) {
        const selectedOptions = Array.from((event.target as HTMLSelectElement).selectedOptions);
        const formattedValues = selectedOptions.map(({ value }) => value);
        onChange && onChange(event, formattedValues);
      } else {
        onChange && onChange(event, event.target.value);
      }
    },
    [multiple, onChange],
  );

  const getSelectedOptionLabelByValue = (value: FormboxValue | undefined): FormboxValue | undefined => {
    return (options.find(option => option?.value === value) || ({} as SelectOption)).label;
  };

  const getSelectedOptionLabelsByValues = (values: FormboxValue[] | undefined): FormboxValue[] | undefined => {
    if (Array.isArray(values)) {
      return values.reduce((acc, value: FormboxValue | undefined) => {
        const label = getSelectedOptionLabelByValue(value);
        if (label !== undefined) {
          acc.push(label);
        }
        return acc;
      }, [] as FormboxValue[]);
    }
    return undefined;
  };

  // convert numbers to strings so <select> doesn't complain
  const convertToString = (input?: FormboxValue): string | undefined => (input !== undefined ? input + '' : input);
  const formattedValue = (multiple
    ? values?.map(value => convertToString(value)).filter(value => value !== undefined)
    : convertToString(value)) as string[] | FormboxValue | undefined;

  // an input is considered empty if there is nothing to show in the input (eg. value or placeholder)
  const hasValue = multiple ? values && values.length > 0 : value !== undefined && value !== '';
  const hasPlaceholder = !multiple && !hasValue && (transitional || placeholder);
  const isEmpty = !hasValue && (!placeholder || !placeholder.value);

  return (
    <Formbox
      className={className}
      contrast={contrast}
      disabled={disabled}
      empty={isEmpty && !placeholder?.label}
      iconAfter={!multiple && !readOnly ? <ArrowDownIcon scale="xsmall" /> : undefined}
      iconBefore={iconBefore}
      id={id}
      readOnly={readOnly}
      themeId={themeId}
      transitional={transitional}
      type="select"
      unthemed={unthemed}
      validity={validity}
      width={width}
      {...props}
    >
      {({ id, focused, required }) =>
        readOnly ? (
          <FormboxReadOnly
            id={id}
            placeholder={placeholder?.label}
            value={multiple ? getSelectedOptionLabelsByValues(values) : getSelectedOptionLabelByValue(value)}
          />
        ) : (
          <FormboxInputWithFormatting<'select'>
            alwaysUseFormatting={!multiple}
            contrast={contrast}
            hasValue={hasValue}
            placeholder={focused ? undefined : placeholder?.label}
            themeId={themeId}
          >
            <select
              className={cx(
                styles.selectInput,
                themeId && !unthemed && styles[`selectInput--${themeId}`],
                hasPlaceholder && !focused && styles['selectInput--hidden'],
                selectProps?.className,
              )}
              disabled={disabled}
              id={id}
              multiple={multiple}
              name={name}
              onChange={handleChange}
              ref={combineRefs}
              required={required}
              value={formattedValue}
              {...selectProps}
            >
              {!multiple && placeholder && focused && (
                <option value={placeholder.value || ''} disabled={placeholder.disabled}>
                  {(focused && placeholder.optionLabel) || placeholder.label}
                </option>
              )}
              {children ||
                options.map(({ disabled, label, value }) => (
                  <option key={value} value={value} disabled={disabled}>
                    {label}
                  </option>
                ))}
            </select>
          </FormboxInputWithFormatting>
        )
      }
    </Formbox>
  );
}

export const Select = React.forwardRef(SelectBase);
Select.displayName = 'Select';
