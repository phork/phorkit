import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Typography.module.css';
import { Typography, TypographyProps } from './Typography';

/**
 * This fixes a problem where SVGs inside the `Typography`
 * component have a small amount of space underneath them.
 */
export function TypographyWithSvg<T extends keyof JSX.IntrinsicElements = 'span'>({
  className,
  ...props
}: TypographyProps<T>) {
  return (
    <Typography
      className={cx(styles.typographyWithSvg, className)}
      {...(props as Omit<TypographyProps, 'className'>)}
    />
  );
}

TypographyWithSvg.displayName = 'TypographyWithSvg';
