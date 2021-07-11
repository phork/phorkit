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
  xxlarge: 14,
  xxxlarge: 14,
  xxxxlarge: 16,
  xxxxxlarge: 16,
  xxxxxxlarge: 18,
  xxxxxxxlarge: 18,
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

export interface LocalStepperProps {
  iconSize?: number;
  inputWidth?: number | string;
  onChange?: (
    event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent,
    value: number,
  ) => void;
  placeholder?: number;
  translations?: StepperTranslations;
  value?: number;
}

export type StepperProps = MergeProps<TextboxProps, LocalStepperProps>;
export type StepperRef = React.ForwardedRef<HTMLInputElement>;

export function StepperBase(
  {
    disabled,
    inputWidth = 72,
    label,
    max,
    min,
    onChange,
    placeholder = 0,
    readOnly,
    size = 'large',
    step = 1,
    translations: customTranslations,
    value,
    ...props
  }: StepperProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const inputRef = useRef<HTMLInputElement>(null!);
  const translations = useTranslations({ customTranslations, fallbackTranslations: stepperTranslations });
  const { incrementLabel, decrementLabel, ...restTranslations } = translations;

  const combineRefs = makeCombineRefs<HTMLInputElement>(inputRef, forwardedRef);

  const handleChange = useCallback(
    (event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent, value: FormboxValue) => {
      let clamped = +value;
      clamped = min ? Math.max(min, clamped) : clamped;
      clamped = max ? Math.min(max, clamped) : clamped;
      onChange && onChange(event, clamped);
    },
    [max, min, onChange],
  );

  const decrement = useCallback(
    (event: React.KeyboardEvent | React.MouseEvent | React.TouchEvent) => {
      const inputValue = inputRef.current?.value;
      const value = inputValue === undefined || inputValue === '' ? placeholder : +inputValue;
      handleChange(event, (value || 0) - step + '');
    },
    [handleChange, placeholder, step],
  );

  const increment = useCallback(
    (event: React.KeyboardEvent | React.MouseEvent | React.TouchEvent) => {
      const inputValue = inputRef.current?.value;
      const value = inputValue === undefined || inputValue === '' ? placeholder : +inputValue;
      handleChange(event, (value || 0) + step + '');
    },
    [handleChange, placeholder, step],
  );

  const isMax = max !== undefined && value !== undefined && value >= max;
  const isMin = min !== undefined && value !== undefined && value <= min;
  const iconSize = iconSizes[size];

  const renderDecrementIcon = () => {
    return readOnly ? undefined : (
      <button
        aria-label={decrementLabel}
        className={styles.stepperButton}
        disabled={isMin || readOnly}
        type="button"
        onClick={decrement}
      >
        <MinusIcon title={decrementLabel} size={iconSize} />
      </button>
    );
  };

  const renderIncrementIcon = () => {
    return readOnly ? undefined : (
      <button
        aria-label={incrementLabel}
        className={styles.stepperButton}
        disabled={isMax || readOnly}
        type="button"
        onClick={increment}
      >
        <PlusIcon title={incrementLabel} size={iconSize} />
      </button>
    );
  };

  return (
    <Textbox
      centered
      disabled={disabled}
      label={label}
      max={max}
      min={min}
      onChange={handleChange}
      readOnly={readOnly}
      iconAfter={renderIncrementIcon()}
      iconBefore={renderDecrementIcon()}
      iconBeforeActionable={!disabled && !isMin}
      iconAfterActionable={!disabled && !isMax}
      inputWidth={inputWidth}
      placeholder={placeholder}
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

export const Stepper = React.forwardRef(StepperBase);

StepperBase.displayName = 'StepperBase';
Stepper.displayName = 'Stepper';
