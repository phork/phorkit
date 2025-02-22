import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Typography.module.css';
import { Typography, TypographyElementType, TypographyProps } from './Typography';

/**
 * This fixes a problem where SVGs inside the `Typography`
 * component have a small amount of space underneath them.
 */
export function TypographyWithSvg<T extends TypographyElementType = 'span'>({
  className,
  ...props
}: TypographyProps<T>): JSX.Element {
  return (
    <Typography
      className={cx(styles.typographyWithSvg, className)}
      {...(props as Omit<TypographyProps, 'className'>)}
    />
  );
}

TypographyWithSvg.displayName = 'TypographyWithSvg';
