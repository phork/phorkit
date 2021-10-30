import { cx } from '@emotion/css';
import React from 'react';
import { MergeProps } from '../../types';
import { renderFromPropWithFallback, RenderFromPropElement } from '../../utils/renderFromProp';
import styles from './styles/Button.module.css';
import { Button, ButtonProps } from './Button';
import { ButtonElementType } from './types';

export type IconButtonShape = 'circle' | 'square';
export type IconButtonElementType = ButtonElementType;

type RenderFromPropProps = {};

export type IconButtonProps<T extends ButtonElementType = 'button'> = MergeProps<
  Omit<ButtonProps<T>, 'align' | 'size'>,
  {
    children: RenderFromPropElement<RenderFromPropProps>;
    shape?: IconButtonShape;
    size?: ButtonProps['size'] | 'xlarge' | '2xlarge' | '3xlarge' | '4xlarge';
  }
>;

const shapeMap = {
  circle: 'pill',
  square: 'brick',
};

export function IconButtonBase<T extends IconButtonElementType = 'button'>(
  { as, children, className, shape, weight: initWeight, ...props }: IconButtonProps<T>,
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): React.ReactElement {
  const classes = cx(styles['button--icon'], shape && styles[`button--${shapeMap[shape]}`], className);
  const content = renderFromPropWithFallback<RenderFromPropProps>(children);
  const weight = initWeight || (shape && 'solid') || (!shape && 'inline');

  return (
    <Button<T>
      noPadding
      className={classes}
      ref={forwardedRef}
      shape={shape ? shapeMap[shape] : undefined}
      weight={weight}
      {...(props as ButtonProps<T>)}
      as={as}
    >
      {content}
    </Button>
  );
}

/**
 * An icon button is an extension of the `Button`
 * component where, instead of a text label, there
 * is an icon.
 */
export const IconButton = React.forwardRef(IconButtonBase) as <T extends IconButtonElementType = 'button'>(
  p: IconButtonProps<T> & { ref?: React.Ref<HTMLElementTagNameMap[T]> },
) => React.ReactElement<T>;

// note that the base element cannot have a displayName because it breaks Storybook
(IconButton as React.NamedExoticComponent).displayName = 'IconButton';
