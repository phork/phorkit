import { cx } from '@emotion/css';
import React from 'react';
import { SemanticColor, ThemeProps, MergeElementProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Button.module.css';

export type ButtonAlignment = 'left' | 'right' | 'center';
export type ButtonWeight = 'outline' | 'text' | undefined;
export type ButtonShape = 'pill' | 'brick';
export type ButtonColor = SemanticColor | 'neutralAccessible' | 'neutralAndPrimary' | 'black' | 'white';

export type ButtonElementType = Extract<keyof JSX.IntrinsicElements, 'button' | 'a' | 'div' | 'span'>;

export interface LocalButtonProps extends ThemeProps {
  active?: boolean;
  align?: ButtonAlignment;
  children: React.ReactNode;
  className?: string;
  color?: ButtonColor;
  disabled?: boolean;
  focused?: boolean;
  fullWidth?: boolean;
  href?: string;
  icon?: boolean;
  loader?: React.ReactElement;
  loading?: boolean;
  noHeight?: boolean;
  noPadding?: boolean;
  noWidth?: boolean;
  noWrap?: boolean;
  onClick?: (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent) => void;
  shape?: ButtonShape;
  type?: 'button' | 'submit';
  unstyled?: boolean;
  weight?: ButtonWeight;
}

export type ButtonProps<T extends ButtonElementType = 'button'> = {
  as?: T;
} & MergeElementProps<T, LocalButtonProps>;

function ButtonBase<T extends ButtonElementType = 'button'>(
  {
    active,
    align,
    as,
    children,
    className,
    color: initColor,
    contrast,
    disabled,
    focused,
    fullWidth,
    href,
    icon,
    loader,
    loading,
    noHeight,
    noPadding,
    noWidth,
    noWrap,
    onClick,
    shape = 'pill',
    themeId: initThemeId,
    type = 'button',
    unstyled,
    weight,
    ...props
  }: ButtonProps<T>,
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : initColor;

  const classes = unstyled
    ? cx(styles.unbutton, className)
    : cx(
        styles.button,
        active && styles['is-active'],
        disabled && styles['is-disabled'],
        focused && styles['is-focused'],
        loading && styles['is-loading'],
        align && styles[`button--${align}`],
        color && styles[`button--${color}`],
        fullWidth && styles['button--fullWidth'],
        icon && styles['button--icon'],
        noHeight && styles['button--noHeight'],
        noPadding && styles['button--noPadding'],
        noWidth && styles['button--noWidth'],
        noWrap && styles['button--noWrap'],
        shape && weight !== 'text' && styles[`button--${shape}`],
        themeId && styles[`button--${themeId}`],
        weight && styles[`button--${weight}`],
        className,
      );

  const handleClick = (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent): void => {
    !disabled && !loading && onClick && onClick(event);
  };

  // if an href is passed we should ignore the `as` and force to an anchor
  const element = href ? 'a' : as || 'button';

  const elementProps = (() => {
    switch (element) {
      case 'a': {
        const elementProps = {} as React.HTMLProps<HTMLAnchorElement>;
        elementProps.onKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
          if (disabled && event.key === 'Enter') {
            event.preventDefault();
          }
        };
        return elementProps;
      }

      case 'button': {
        const elementProps = {} as React.HTMLProps<HTMLButtonElement>;
        elementProps.type = type || 'button';
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
      disabled,
      href,
      onClick: handleClick,
      ref: forwardedRef,
      ...({ ...elementProps, ...props } as React.HTMLProps<HTMLElementTagNameMap[T]>),
    },
    <React.Fragment>
      <span className={styles.button__content}>{children}</span>
      {loading && <span className={styles.button__loader}>{loader}</span>}
    </React.Fragment>,
  );
}

export const Button = React.forwardRef(ButtonBase) as typeof ButtonBase;
