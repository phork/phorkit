/* eslint-disable jsx-a11y/no-onchange */
import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { MergeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { ArrowDownIcon } from '../../../icons/ArrowDownIcon';
import {
  FormboxReadOnly,
  Formbox,
  FormboxProps,
  FormboxValue,
  FormboxInputWithFormatting,
  useAutoFilled,
} from '../Formbox';
import styles from './styles/Select.module.css';

const arrowIconSizes = {
  medium: 8,
  large: 8,
  xlarge: 9,
  '2xlarge': 11,
  '3xlarge': 13,
  '4xlarge': 14,
  '5xlarge': 14,
  '6xlarge': 14,
  '7xlarge': 14,
  '8xlarge': 16,
};

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
  /** The placeholder label shown in the select list */
  optionLabel?: string;
  value?: string;
};

type SingleSelectProps = {
  multiple?: never | false;
  transitional?: boolean;
  /** The value prop is not for use with multiple selects */
  value?: FormboxValue;
  values?: never;
};

type MultipleSelectProps = {
  multiple: true;
  transitional?: never | false;
  value?: never;
  /** The values prop is only for use with multiple selects */
  values?: FormboxValue[];
};

export type LocalSelectProps = Pick<
  FormboxProps,
  | 'alwaysTriggerBlur'
  | 'alwaysTriggerFocus'
  | 'className'
  | 'contrast'
  | 'disabled'
  | 'iconAfter'
  | 'iconAfterActionable'
  | 'iconAfterClassName'
  | 'iconBefore'
  | 'iconBeforeActionable'
  | 'iconBeforeClassName'
  | 'id'
  | 'inputWidth'
  | 'label'
  | 'onBlur'
  | 'onFocus'
  | 'persistEvents'
  | 'readOnly'
  | 'required'
  | 'size'
  | 'style'
  | 'themeId'
  | 'transitional'
  | 'translations'
  | 'transparent'
  | 'unthemed'
  | 'validity'
  | 'variant'
  | 'visuallyFocused'
  | 'width'
> & {
  arrowIconSize?: number;
  /** The children can be used to manually add options rather than using the options prop */
  children?: FormboxValue | FormboxValue[];
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  name?: string;
  onAnimationStart?: React.AnimationEventHandler<HTMLSelectElement>;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>, value?: FormboxValue | FormboxValue[]) => void;
  onInputBlur?: React.FocusEventHandler<HTMLSelectElement>;
  onInputFocus?: React.FocusEventHandler<HTMLSelectElement>;
  options: readonly SelectOption[];
  /** If an option cannot be unselected then a placeholder with `disabled: true` should be used */
  placeholder?: SelectOptionPlaceholder;
} & (SingleSelectProps | MultipleSelectProps);

export type SelectProps = MergeProps<
  Omit<React.ComponentPropsWithoutRef<'select'>, 'className' | 'onAnimationStart' | 'size' | 'style' | 'width'>,
  LocalSelectProps
> & {
  formboxProps?: Omit<Omit<FormboxProps, 'autoFilled'>, keyof LocalSelectProps>;
};

export type SelectRef = React.ForwardedRef<HTMLSelectElement>;

export function SelectBase(
  {
    alwaysTriggerBlur,
    alwaysTriggerFocus,
    arrowIconSize: initArrowIconSize,
    children,
    className,
    contrast = false,
    disabled = false,
    formboxProps,
    iconAfter,
    iconAfterActionable,
    iconAfterClassName,
    iconBefore,
    iconBeforeActionable,
    iconBeforeClassName,
    id,
    inputClassName,
    inputStyle,
    inputWidth,
    label,
    multiple,
    name,
    onAnimationStart,
    onBlur,
    onChange,
    onFocus,
    onInputBlur,
    onInputFocus,
    options,
    persistEvents,
    placeholder,
    readOnly = false,
    required,
    size = 'large',
    style,
    themeId: initThemeId,
    transitional = false,
    translations,
    transparent,
    unthemed = false,
    validity,
    value,
    values,
    variant,
    visuallyFocused,
    width,
    ...props
  }: SelectProps,
  forwardedRef: React.ForwardedRef<HTMLSelectElement>,
) {
  const themeId = useThemeId(initThemeId);
  const inputRef = useRef<HTMLSelectElement>(null);
  const combineRefs = makeCombineRefs<HTMLSelectElement>(inputRef, forwardedRef);

  const { autoFilled, handleAnimationStart } = useAutoFilled<HTMLSelectElement>({ onAnimationStart });

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

  const getSelectedOptionLabelsByValues = (values: readonly FormboxValue[] | undefined): FormboxValue[] | undefined => {
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
  const formattedValue = (
    multiple
      ? values?.map(value => convertToString(value)).filter(value => value !== undefined)
      : convertToString(value)
  ) as string[] | FormboxValue | undefined;

  // an input is considered empty if there is nothing to show in the input (eg. value or placeholder)
  const hasValue = multiple ? values && values.length > 0 : value !== undefined && value !== '';
  const hasPlaceholder = !multiple && !hasValue && (transitional || placeholder);
  const isEmpty = !hasValue && (!placeholder || !placeholder.value);

  const arrowIconSize = initArrowIconSize || arrowIconSizes[size];

  return (
    <Formbox
      alwaysTriggerBlur={alwaysTriggerBlur}
      alwaysTriggerFocus={alwaysTriggerFocus}
      autoFilled={autoFilled}
      className={className}
      contrast={contrast}
      disabled={disabled}
      empty={isEmpty && !placeholder?.label}
      iconAfter={iconAfter || (!multiple && !readOnly ? <ArrowDownIcon size={arrowIconSize} /> : undefined)}
      iconAfterActionable={iconAfterActionable}
      iconAfterClassName={iconAfterClassName}
      iconBefore={iconBefore}
      iconBeforeActionable={iconBeforeActionable}
      iconBeforeClassName={iconBeforeClassName}
      id={id}
      inputWidth={inputWidth}
      label={label}
      onBlur={onBlur}
      onFocus={onFocus}
      persistEvents={persistEvents}
      readOnly={readOnly}
      required={required}
      size={size}
      style={style}
      themeId={themeId}
      transitional={transitional}
      translations={translations}
      transparent={transparent}
      type="select"
      unthemed={unthemed}
      validity={validity}
      variant={variant}
      visuallyFocused={visuallyFocused}
      width={width}
      {...formboxProps}
    >
      {({ id, focused, required, variant }) =>
        readOnly ? (
          <FormboxReadOnly
            contrast={contrast}
            id={id}
            placeholder={placeholder?.label}
            value={multiple ? getSelectedOptionLabelsByValues(values) : getSelectedOptionLabelByValue(value)}
          />
        ) : (
          <FormboxInputWithFormatting<'select'>
            alwaysUseFormatting={!multiple}
            contrast={contrast}
            focused={focused}
            hasValue={hasValue}
            placeholder={focused ? undefined : placeholder?.label}
            themeId={themeId}
            variant={variant}
          >
            <select
              className={cx(
                styles.selectInput,
                themeId && !unthemed && styles[`selectInput--${themeId}`],
                hasPlaceholder && !focused && styles['selectInput--hidden'],
                inputClassName,
              )}
              disabled={disabled}
              id={id}
              multiple={multiple}
              name={name}
              onAnimationStart={handleAnimationStart}
              onBlur={onInputBlur}
              onChange={handleChange}
              onFocus={onInputFocus}
              ref={combineRefs}
              required={required}
              style={inputStyle}
              value={formattedValue}
              {...props}
            >
              {!multiple && placeholder && focused && (
                <option disabled={placeholder.disabled} value={placeholder.value || ''}>
                  {(focused && placeholder.optionLabel) || placeholder.label}
                </option>
              )}
              {children ||
                options.map(({ disabled, label, value }) => (
                  <option disabled={disabled} key={value} value={value}>
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

/**
 * The select component extends the `Formbox` component and
 * contains both a select form input and a label. It accepts
 * custom icons, a placeholder value, a read only state (in
 * addition to a disabled state) and several custom style
 * options.
 *
 * The selected state (value) should be stored outside of
 * this component and is updated by the `onChange` callback.
 */
export const Select = React.forwardRef(SelectBase);

// note that the base element cannot have a displayName because it breaks Storybook
Select.displayName = 'Select';
