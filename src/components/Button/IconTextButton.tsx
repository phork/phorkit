import { cx } from '@emotion/css';
import React from 'react';
import { renderFromProp, renderFromPropWithFallback, RenderFromPropElement } from '../../utils/renderFromProp';
import { Button, ButtonProps } from './Button';
import styles from './styles/Button.module.css';

export interface IconTextButtonProps extends Omit<ButtonProps, 'icon'> {
  icon: RenderFromPropElement;
  text: RenderFromPropElement;
}

export function IconTextButton({ className, icon, text, ...props }: IconTextButtonProps): React.ReactElement {
  const classes = cx(styles['button--iconText'], className);

  return (
    <Button className={classes} {...props}>
      <span className={styles.button__icon}>{renderFromProp(icon)}</span>
      <span className={styles.button__text}>{renderFromPropWithFallback(text)}</span>
    </Button>
  );
}
