import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementPropsWithoutRef, Orientation } from '../../../types';
import styles from './styles/LabelWrapper.module.css';

export type LabelWrapperElementType = Extract<keyof HTMLElementTagNameMap, 'a' | 'label' | 'div'>;

export type LocalLabelWrapperProps<T extends LabelWrapperElementType> = React.HTMLAttributes<
  HTMLElementTagNameMap[T]
> & {
  className?: string;
  fullWidth?: boolean;
  input: React.ReactElement;
  inputWidth?: string | number;
  label: React.ReactElement;
  labelWidth?: string | number;
  orientation?: Orientation;
  /** Reverse the order of components using the flexbox direction */
  reverse?: boolean;
  spread?: boolean;
  style?: React.CSSProperties;
};

export type LabelWrapperProps<T extends LabelWrapperElementType = 'div'> = AsReactType<T> &
  MergeElementPropsWithoutRef<T, LocalLabelWrapperProps<T>>;

/**
 * A label wrapper positions a form input and a label
 * relative to each other. They can be side by side,
 * or one can be on top of the other.
 */
export function LabelWrapper<T extends LabelWrapperElementType = 'div'>({
  as,
  className,
  fullWidth = false,
  input,
  inputWidth,
  label,
  labelWidth,
  orientation = 'horizontal',
  reverse = false,
  spread = false,
  ...props
}: LabelWrapperProps<T>): JSX.Element {
  const element = as || 'div';
  const inputStyle: React.CSSProperties = {};
  (inputWidth || inputWidth === 0) &&
    (inputStyle.width = typeof inputWidth === 'string' ? inputWidth : `${inputWidth}px`);

  const labelStyle: React.CSSProperties = {};
  (labelWidth || labelWidth === 0) &&
    (labelStyle.width = typeof labelWidth === 'string' ? labelWidth : `${labelWidth}px`);

  return React.createElement(
    element,
    {
      className: cx(
        styles.labelWrapper,
        reverse && styles['labelWrapper--reverse'],
        spread && styles['labelWrapper--spread'],
        fullWidth && styles['labelWrapper--fullWidth'],
        styles[`labelWrapper--${orientation}`],
        className,
      ),
      ...props,
    },
    <>
      <div className={styles.labelWrapper__label} style={labelStyle}>
        {label}
      </div>
      <div className={styles.labelWrapper__input} style={inputStyle}>
        {input}
      </div>
    </>,
  );
}

LabelWrapper.displayName = 'LabelWrapper';
