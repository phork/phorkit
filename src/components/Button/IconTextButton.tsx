import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementProps } from '../../types';
import { renderFromProp, renderFromPropWithFallback, RenderFromPropElement } from '../../utils/renderFromProp';
import { Button, LocalButtonProps, ButtonProps } from './Button';
import styles from './styles/Button.module.css';
import { ButtonElementType } from './types';

export type IconTextButtonElementType = ButtonElementType;

export interface LocalIconTextButtonProps extends Omit<LocalButtonProps, 'children'> {
  icon: RenderFromPropElement<{}>;
  children: RenderFromPropElement<{}> | string;
  reverse?: boolean;
}

export type IconTextButtonProps<T extends ButtonElementType = 'button'> = AsReactType<T> &
  MergeElementProps<T, LocalIconTextButtonProps>;

export function IconTextButtonBase<T extends IconTextButtonElementType = 'button'>(
  { as, children, className, icon, reverse = false, ...props }: IconTextButtonProps<T>,
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): React.ReactElement {
  const classes = cx(reverse ? styles['button--iconTextReverse'] : styles['button--iconText'], className);

  return (
    <Button<T> as={as} className={classes} ref={forwardedRef} {...(props as ButtonProps<T>)}>
      <span className={styles.button__icon}>{renderFromProp<{}>(icon)}</span>
      <span className={styles.button__text}>{renderFromPropWithFallback<{}>(children)}</span>
    </Button>
  );
}

export const IconTextButton = React.forwardRef(IconTextButtonBase) as typeof IconTextButtonBase;

IconTextButtonBase.displayName = 'IconTextButtonBase';
IconTextButton.displayName = 'IconTextButton';
