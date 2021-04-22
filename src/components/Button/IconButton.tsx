import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementProps } from '../../types';
import { renderFromPropWithFallback, RenderFromPropElement } from '../../utils/renderFromProp';
import { Button, ButtonElementType, ButtonProps, LocalButtonProps } from './Button';
import styles from './styles/Button.module.css';

export type IconButtonShape = 'round' | 'square';
export type IconButtonElementType = ButtonElementType;

export interface LocalIconButtonProps extends Omit<LocalButtonProps, 'children' | 'shape'> {
  children: RenderFromPropElement;
  shape?: IconButtonShape;
}

export type IconButtonProps<T extends ButtonElementType = 'button'> = AsReactType<T> &
  MergeElementProps<T, LocalIconButtonProps>;

const shapeMap = {
  round: 'pill',
  square: 'brick',
};

function IconButtonBase<T extends IconButtonElementType = 'button'>(
  { as, children, className, shape, weight: initWeight, ...props }: IconButtonProps<T>,
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): React.ReactElement {
  const classes = cx(styles['button--icon'], shape && styles[`button--${shapeMap[shape]}`], className);
  const content = renderFromPropWithFallback(children);
  const weight = initWeight || (shape && 'filled') || (!shape && 'text');

  return (
    <Button<T>
      as={as}
      className={classes}
      ref={forwardedRef}
      shape={shape ? shapeMap[shape] : undefined}
      weight={weight}
      {...(props as ButtonProps<T>)}
    >
      {content}
    </Button>
  );
}

export const IconButton = React.forwardRef(IconButtonBase) as typeof IconButtonBase;
IconButtonBase.displayName = 'IconButtonBase';