import { cx } from '@emotion/css';
import React from 'react';
import { MergeProps } from '../../types';
import styles from './styles/Button.module.css';
import { Button, ButtonProps } from './Button';
import { ButtonElementType } from './types';

export type IconTextButtonElementType = ButtonElementType;

export type IconTextButtonProps<T extends ButtonElementType = 'button'> = MergeProps<
  ButtonProps<T>,
  {
    icon: React.ReactElement<SVGElement>;
    children: React.ReactChild;
    /** If this is true then the loader icon will replace the icon and the text will remain */
    loaderReplaceIcon?: boolean;
    reverse?: boolean;
  }
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
      aria-busy={loading}
      aria-live="polite"
      as={as}
    >
      <span className={styles.button__icon}>{loading && loaderReplaceIcon && loader ? loader : icon}</span>
      <span className={styles.button__text}>{children}</span>
    </Button>
  );
}

/**
 * An icon text button is an extension of the `Button`
 * component where, in addition to a text label, there
 * is an icon to the left or right of it. The loader
 * can either replace the entire button content or
 * just the icon part of it.
 */
export const IconTextButton = React.forwardRef(IconTextButtonBase) as <T extends IconTextButtonElementType = 'button'>(
  p: IconTextButtonProps<T> & { ref?: React.Ref<HTMLElementTagNameMap[T]> },
) => React.ReactElement<T>;

// note that the base element cannot have a displayName because it breaks Storybook
(IconTextButton as React.NamedExoticComponent).displayName = 'IconTextButton';
