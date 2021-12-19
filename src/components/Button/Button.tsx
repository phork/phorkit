import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps, AsReactType, MergeElementPropsWithoutRef } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Button.module.css';
import { ButtonAlignment, ButtonWeight, ButtonShape, ButtonSize, ButtonColor, ButtonElementType } from './types';

export type LocalButtonProps = ThemeProps & {
  /** Manually apply the active styles; this does not affect :active */
  active?: boolean;
  align?: ButtonAlignment;
  children: React.ReactChild | React.ReactFragment;
  className?: string;
  color?: ButtonColor;
  disabled?: boolean;
  /** Manually apply the focus styles; this does not affect :focus */
  focused?: boolean;
  fullWidth?: boolean;
  /** Manually apply the hover styles; this does not affect :hover */
  hovered?: boolean;
  href?: string;
  /** An imitation button looks like a button but doesn't have any functionality */
  imitation?: boolean;
  loader?: React.ReactElement;
  loading?: boolean;
  /** Remove the minimum height styles */
  noHeight?: boolean;
  noPadding?: boolean;
  onClick?: (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent) => void;
  shape?: ButtonShape;
  size?: ButtonSize;
  style?: React.CSSProperties;
  type?: 'button' | 'submit';
  unstyled?: boolean;
  unthemed?: boolean;
  weight?: ButtonWeight;
};

export type ButtonProps<T extends ButtonElementType = 'button'> = AsReactType<T> &
  MergeElementPropsWithoutRef<T, LocalButtonProps>;

export function ButtonBase<T extends ButtonElementType = 'button'>(
  {
    active = false,
    align,
    as,
    children,
    className,
    color: initColor,
    contrast = false,
    disabled: initDisabled = false,
    focused = false,
    fullWidth = false,
    hovered = false,
    href,
    imitation = false,
    loader,
    loading = false,
    noHeight = false,
    noPadding = false,
    onClick,
    shape = 'pill',
    size = 'medium',
    themeId: initThemeId,
    type = 'button',
    unstyled = false,
    unthemed = false,
    weight = 'solid',
    ...props
  }: ButtonProps<T>,
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : initColor;
  const disabled = initDisabled || loading ? true : false;

  const classes = unstyled
    ? cx(styles.unbutton, className)
    : cx(
        styles.button,
        active && styles['is-active'],
        disabled && styles['is-disabled'],
        focused && styles['is-focused'],
        hovered && styles['is-hovered'],
        loading && styles['is-loading'],
        align && styles[`button--${align}`],
        color && !unthemed && styles[`button--${color}`],
        fullWidth && styles['button--fullWidth'],
        imitation && styles['button--imitation'],
        (noHeight || weight === 'inline') && styles['button--noHeight'],
        (noPadding || weight === 'inline') && styles['button--noPadding'],
        shape && weight !== 'inline' && styles[`button--${shape}`],
        size && styles[`button--${size}`],
        themeId && !unthemed && styles[`button--${themeId}`],
        weight && styles[`button--${weight}`],
        className,
      );

  const handleClick = (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent): void => {
    !disabled && !loading && onClick && onClick(event);
  };

  // if an href is passed we should ignore the `as` and force to an anchor
  const element = (href && 'a') || (imitation && 'div') || as || 'button';

  const elementProps = (() => {
    if (imitation) return {};

    switch (element) {
      case 'a': {
        const elementProps = {} as React.HTMLProps<HTMLAnchorElement>;
        elementProps.onKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
          if (disabled && event.key === 'Enter') {
            event.preventDefault();
          }
        };
        elementProps.href = href;
        return elementProps;
      }

      case 'button': {
        const elementProps = {} as React.HTMLProps<HTMLButtonElement>;
        elementProps.type = type;
        elementProps.disabled = disabled;
        return elementProps;
      }

      default: {
        const elementProps = {} as React.HTMLProps<HTMLElement>;
        elementProps.role = 'button';
        elementProps.tabIndex = 0;

        elementProps.onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
          if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();

            handleClick(event);
          }
        };
        return elementProps;
      }
    }
  })();

  return React.createElement(
    element,
    {
      className: classes,
      onClick: handleClick,
      ref: forwardedRef,
      ...({ ...elementProps, 'aria-busy': loading, 'aria-live': 'polite', ...props } as React.HTMLAttributes<T>),
    },
    <React.Fragment>
      <span className={styles.button__content}>{children}</span>
      {loading && <span className={styles.button__loader}>{loader}</span>}
    </React.Fragment>,
  );
}

/**
 * A button can have one of several fill styles and
 * colors, and can show an optional loading spinner.
 * It can be a standard HTML button with all the usual
 * button actions, a link that looks like a button, or
 * a read-only imitation of a button.
 */
export const Button = React.forwardRef(ButtonBase) as <T extends ButtonElementType = 'button'>(
  p: ButtonProps<T> & { ref?: React.Ref<HTMLElementTagNameMap[T]> },
) => React.ReactElement<T>;

// note that the base element cannot have a displayName because it breaks Storybook
(Button as React.NamedExoticComponent).displayName = 'Button';
