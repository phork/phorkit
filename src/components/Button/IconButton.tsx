import { cx } from '@emotion/css';
import React from 'react';
import { AsType, MergeProps } from '../../types';
import { lowerCamelize } from '../../utils/case';
import { renderFromPropWithFallback, RenderFromPropElement } from '../../utils/renderFromProp';
import { Button, ButtonElementType, ButtonProps } from './Button';
import styles from './styles/Button.module.css';

export type IconButtonShape = 'round' | 'square';
export type IconButtonElementType = ButtonElementType;

export interface LocalIconButtonProps {
  children: RenderFromPropElement;
  shape?: IconButtonShape;
}

export type IconButtonProps<T extends IconButtonElementType = 'button'> = AsType<T> &
  MergeProps<Omit<ButtonProps<T>, 'as'>, LocalIconButtonProps>;

function IconButtonBase<T extends IconButtonElementType = 'button'>(
  { as, children, className, shape, ...props }: IconButtonProps<T>,
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): React.ReactElement {
  const classes = cx(styles['button--icon'], shape && styles[`button--${lowerCamelize('icon', shape)}`], className);
  const content = renderFromPropWithFallback(children);

  return (
    <Button<T>
      as={as}
      weight={!shape ? 'text' : undefined}
      className={classes}
      ref={forwardedRef}
      {...(props as ButtonProps<T>)}
    >
      {content}
    </Button>
  );
}

export const IconButton = React.forwardRef(IconButtonBase) as typeof IconButtonBase;
