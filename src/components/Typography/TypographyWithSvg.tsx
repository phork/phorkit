import { cx } from '@emotion/css';
import React from 'react';
import { Typography, TypographyProps } from './Typography';
import styles from './styles/Typography.module.css';

export const TypographyWithSvg = ({ className, ...props }: TypographyProps) => {
  return <Typography className={cx(styles.typographyWithSvg, className)} {...props} />;
};
