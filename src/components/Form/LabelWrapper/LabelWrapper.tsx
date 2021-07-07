import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementPropsWithoutRef } from '../../../types';
import styles from './styles/LabelWrapper.module.css';

export interface LocalLabelWrapperProps {
  className?: string;
  fullWidth?: boolean;
  input: React.ReactElement;
  inputWidth?: string | number;
  label: React.ReactElement;
  labelWidth?: string | number;
  reverse?: boolean;
  spread?: boolean;
  vertical?: boolean;
}

export type LabelWrapperProps<T extends React.ElementType = 'div'> = AsReactType<T> &
  MergeElementPropsWithoutRef<T, LocalLabelWrapperProps>;

export function LabelWrapper<T extends React.ElementType = 'div'>({
  as,
  className,
  fullWidth = false,
  input,
  inputWidth,
  label,
  labelWidth,
  reverse = false,
  spread = false,
  vertical = false,
  ...props
}: LabelWrapperProps<T>): React.ReactElement<LocalLabelWrapperProps, T> {
  const Element = as || 'div';
  const inputStyle: React.CSSProperties = {};
  (inputWidth || inputWidth === 0) &&
    (inputStyle.width = typeof inputWidth === 'string' ? inputWidth : `${inputWidth}px`);

  const labelStyle: React.CSSProperties = {};
  (labelWidth || labelWidth === 0) &&
    (labelStyle.width = typeof labelWidth === 'string' ? labelWidth : `${labelWidth}px`);

  return (
    <Element
      className={cx(
        styles.labelWrapper,
        reverse && styles['labelWrapper--reverse'],
        spread && styles['labelWrapper--spread'],
        fullWidth && styles['labelWrapper--fullWidth'],
        styles[`labelWrapper--${vertical ? 'vertical' : 'horizontal'}`],
        className,
      )}
      {...props}
    >
      <div className={styles.labelWrapper__label} style={labelStyle}>
        {label}
      </div>
      <div className={styles.labelWrapper__input} style={inputStyle}>
        {input}
      </div>
    </Element>
  );
}

LabelWrapper.displayName = 'LabelWrapper';
