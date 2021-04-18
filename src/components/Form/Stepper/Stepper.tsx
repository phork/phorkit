import React, { useCallback, useRef } from 'react';
import { MergeProps } from '../../../types';
import { useTranslations } from '../../../hooks/useTranslations';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { MinusIcon } from '../../../icons/MinusIcon';
import { PlusIcon } from '../../../icons/PlusIcon';
import { FormboxValue } from '../Formbox';
import { Textbox, TextboxProps, TextboxTranslations, textboxTranslations } from '../Textbox';
import styles from './styles/Stepper.module.css';

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
  inputWidth?: number | string;
  onChange?: (
    event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent,
    value: number,
  ) => void;
  persistEvents?: boolean;
  translations?: StepperTranslations;
  value?: number;
}

export type StepperProps = MergeProps<TextboxProps, LocalStepperProps> & {
  ref?: React.Ref<HTMLInputElement>;
};

export function StepperBase(
  {
    disabled,
    inputWidth = 72,
    label,
    max,
    min,
    onChange,
    persistEvents,
    readOnly,
    step = 1,
    translations: customTranslations,
    value = 0,
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
      persistEvents && event.persist();

      let clamped = +value;
      clamped = min ? Math.max(min, clamped) : clamped;
      clamped = max ? Math.min(max, clamped) : clamped;
      onChange && onChange(event, clamped);
    },
    [max, min, onChange, persistEvents],
  );

  const decrement = useCallback(
    (event: React.KeyboardEvent | React.MouseEvent | React.TouchEvent) => {
      const value = +inputRef.current?.value;
      handleChange(event, (value || 0) - step + '');
    },
    [handleChange, step],
  );

  const increment = useCallback(
    (event: React.KeyboardEvent | React.MouseEvent | React.TouchEvent) => {
      const value = +inputRef.current?.value;
      handleChange(event, (value || 0) + step + '');
    },
    [handleChange, step],
  );

  const isMax = max !== undefined && value >= max;
  const isMin = min !== undefined && value <= min;

  const renderDecrementIcon = () => {
    return (
      <button
        aria-label={decrementLabel}
        className={styles.stepperButton}
        disabled={isMin || readOnly}
        type="button"
        onClick={decrement}
      >
        <MinusIcon title={decrementLabel} scale="small" />
      </button>
    );
  };

  const renderIncrementIcon = () => {
    return (
      <button
        aria-label={incrementLabel}
        className={styles.stepperButton}
        disabled={isMax || readOnly}
        type="button"
        onClick={increment}
      >
        <PlusIcon title={incrementLabel} scale="small" />
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
      ref={combineRefs}
      step={step}
      translations={Object.keys(restTranslations).length ? restTranslations : undefined}
      type="number"
      value={value || ''}
      {...props}
    />
  );
}

export const Stepper = React.forwardRef(StepperBase);
StepperBase.displayName = 'StepperBase';
