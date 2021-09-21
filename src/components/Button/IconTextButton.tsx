import { cx } from '@emotion/css';
import React from 'react';
import { MergeProps } from '../../types';
import { renderFromProp, renderFromPropWithFallback, RenderFromPropElement } from '../../utils/renderFromProp';
import styles from './styles/Button.module.css';
import { Button, ButtonProps } from './Button';
import { ButtonElementType } from './types';

export type IconTextButtonElementType = ButtonElementType;

export interface LocalIconTextButtonProps {
  icon: RenderFromPropElement<{}>;
  children: RenderFromPropElement<{}> | string;
  /** If this is true then the loader icon will replace the icon and the text will remain */
  loaderReplaceIcon?: boolean;
  reverse?: boolean;
}

export type IconTextButtonProps<T extends ButtonElementType = 'button'> = MergeProps<
  ButtonProps<T>,
  LocalIconTextButtonProps
>;

export function IconTextButtonBase<T extends IconTextButtonElementType = 'button'>(
  {
    as,
    children,
    className,
    disabled,
    icon,
    loading,
    loader,
    loaderReplaceIcon,
    reverse = false,
    ...props
  }: IconTextButtonProps<T>,
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): React.ReactElement {
  const classes = cx(reverse ? styles['button--iconTextReverse'] : styles['button--iconText'], className);

  return (
    <Button<T>
      className={classes}
      disabled={disabled || (loading && loaderReplaceIcon)}
      loader={loader}
      loading={loading && !loaderReplaceIcon}
      ref={forwardedRef}
      {...(props as ButtonProps<T>)}
      as={as}
    >
      <span className={styles.button__icon}>
        {renderFromProp<{}>(loading && loaderReplaceIcon && loader ? loader : icon)}
      </span>
      <span className={styles.button__text}>{renderFromPropWithFallback<{}>(children)}</span>
    </Button>
  );
}

export const IconTextButton = React.forwardRef(IconTextButtonBase) as <T extends IconTextButtonElementType = 'button'>(
  p: IconTextButtonProps<T> & { ref?: React.Ref<HTMLElementTagNameMap[T]> },
) => React.ReactElement<T>;

// note that the base element cannot have a displayName because it breaks Storybook
(IconTextButton as React.NamedExoticComponent).displayName = 'IconTextButton';
