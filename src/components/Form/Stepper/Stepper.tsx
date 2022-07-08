import React, { useCallback, useRef } from 'react';
import { MergeProps } from '../../../types';
import { useTranslations } from '../../../hooks/useTranslations';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { MinusIcon } from '../../../icons/MinusIcon';
import { PlusIcon } from '../../../icons/PlusIcon';
import { FormboxValue } from '../Formbox';
import { Textbox, TextboxProps, TextboxTranslations, textboxTranslations } from '../Textbox';
import styles from './styles/Stepper.module.css';

const iconSizes = {
  medium: 12,
  large: 12,
  xlarge: 14,
  '2xlarge': 14,
  '3xlarge': 14,
  '4xlarge': 16,
  '5xlarge': 16,
  '6xlarge': 18,
  '7xlarge': 18,
  '8xlarge': 18,
};

export type StepperTranslations = TextboxTranslations & {
  decrementLabel: string;
  incrementLabel: string;
};

export const stepperTranslations: StepperTranslations = {
  ...textboxTranslations,
  decrementLabel: 'Decrement',
  incrementLabel: 'Increment',
};

export type LocalStepperProps = {
  inputWidth?: number | string;
  onChange?: (
    event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent,
    value: number | '',
  ) => void;
  placeholder?: number | '';
  translations?: Partial<StepperTranslations>;
  value?: number;
};

export type StepperProps = MergeProps<
  Omit<
    TextboxProps,
    | 'centered'
    | 'clearable'
    | 'iconAfter'
    | 'iconAfterActionable'
    | 'iconBefore'
    | 'iconBeforeActionable'
    | 'inputWidth'
    | 'onChange'
    | 'placeholder'
    | 'ref'
    | 'transitional'
    | 'translations'
    | 'type'
    | 'value'
    | 'width'
  >,
  LocalStepperProps
>;
export type StepperRef = React.ForwardedRef<HTMLInputElement>;

export function StepperBase(
  {
    disabled,
    inputWidth = 72,
    label,
    max,
    min,
    onChange,
    placeholder,
    readOnly,
    size = 'large',
    step = 1,
    translations: customTranslations,
    value,
    ...props
  }: StepperProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const translations = useTranslations<StepperTranslations>({
    customTranslations,
    fallbackTranslations: stepperTranslations,
  });
  const { incrementLabel, decrementLabel, ...restTranslations } = translations;

  const combineRefs = makeCombineRefs<HTMLInputElement>(inputRef, forwardedRef);

  const handleChange = useCallback(
    (event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent, value: FormboxValue) => {
      if (value === '') {
        onChange && onChange(event, '');
      } else {
        let clamped = +value;
        clamped = min ? Math.max(min, clamped) : clamped;
        clamped = max ? Math.min(max, clamped) : clamped;
        onChange && onChange(event, clamped);
      }
    },
    [max, min, onChange],
  );

  const decrement = useCallback(
    (event: React.KeyboardEvent | React.MouseEvent | React.TouchEvent) => {
      const inputValue = inputRef.current?.value;
      const value = inputValue === undefined || inputValue === '' ? placeholder : +inputValue;
      handleChange(event, (value || placeholder || 0) - step + '');
    },
    [handleChange, placeholder, step],
  );

  const increment = useCallback(
    (event: React.KeyboardEvent | React.MouseEvent | React.TouchEvent) => {
      const inputValue = inputRef.current?.value;
      const value = inputValue === undefined || inputValue === '' ? placeholder : +inputValue;
      handleChange(event, (value || placeholder || 0) + step + '');
    },
    [handleChange, placeholder, step],
  );

  const isMax = max !== undefined && value !== undefined && value >= max;
  const isMin = min !== undefined && value !== undefined && value <= min;
  const iconSize = iconSizes[size];

  const decrementIcon = readOnly ? undefined : (
    <button
      aria-label={decrementLabel}
      className={styles.stepperButton}
      disabled={isMin || readOnly}
      onClick={decrement}
      type="button"
    >
      <MinusIcon size={iconSize} title={decrementLabel} />
    </button>
  );

  const incrementIcon = readOnly ? undefined : (
    <button
      aria-label={incrementLabel}
      className={styles.stepperButton}
      disabled={isMax || readOnly}
      onClick={increment}
      type="button"
    >
      <PlusIcon size={iconSize} title={incrementLabel} />
    </button>
  );

  return (
    <Textbox
      centered={!readOnly}
      disabled={disabled}
      iconAfter={incrementIcon}
      iconAfterActionable={!disabled && !isMax}
      iconBefore={decrementIcon}
      iconBeforeActionable={!disabled && !isMin}
      inputWidth={inputWidth}
      label={label}
      max={max}
      min={min}
      onChange={handleChange}
      placeholder={placeholder !== undefined ? `${placeholder}` : undefined}
      readOnly={readOnly}
      ref={combineRefs}
      size={size}
      step={step}
      translations={Object.keys(restTranslations).length ? restTranslations : undefined}
      type="number"
      value={value}
      width="auto"
      {...props}
    />
  );
}

/**
 * The stepper component extends the `Textbox` component
 * with plus and minus icon buttons to increment and
 * decrement the count. The input value must be a number.
 *
 * The value state should be stored outside of this component
 * and is updated by the `onChange` callback.
 */
export const Stepper = React.forwardRef(StepperBase);

// note that the base element cannot have a displayName because it breaks Storybook
Stepper.displayName = 'Stepper';
