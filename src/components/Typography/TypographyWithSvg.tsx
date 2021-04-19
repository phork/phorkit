import { cx } from '@emotion/css';
import React from 'react';
import { Typography, TypographyProps } from './Typography';
import styles from './styles/Typography.module.css';

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
