import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementProps, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { useTranslations } from '../../hooks/useTranslations';
import styles from './styles/Avatar.module.css';

export type AvatarTranslations = {
  label: string;
};

export const avatarTranslations: AvatarTranslations = {
  label: 'Avatar',
};

export type AvatarElementType = Extract<keyof HTMLElementTagNameMap, 'a' | 'button' | 'div' | 'figure'>;

export type LocalAvatarProps<T extends AvatarElementType = 'div'> = ThemeProps &
  React.HTMLAttributes<HTMLElementTagNameMap[T]> & {
    actionable?: boolean;
    className?: string;
    color?: 'neutral' | 'primary';
    imgSrc?: string;
    initials?: string;
    size?:
      | 'xsmall'
      | 'small'
      | 'medium'
      | 'large'
      | 'xlarge'
      | '2xlarge'
      | '3xlarge'
      | '4xlarge'
      | '5xlarge'
      | 'custom';
    style?: React.CSSProperties;
    translations?: Partial<AvatarTranslations>;
  };

export type AvatarProps<T extends AvatarElementType = 'div'> = AsReactType<T> & MergeElementProps<T, LocalAvatarProps>;

/**
 * An avatar represents a user as a picture or initials.
 * It can be rendered as a standard read-only div, an
 * actionable button, or a custom element.
 */
export function Avatar<T extends AvatarElementType = 'div'>({
  actionable = false,
  as,
  className,
  color: initColor,
  contrast = false,
  imgSrc,
  initials,
  size = 'medium',
  style,
  themeId: initThemeId,
  translations: customTranslations,
  unthemed = false,
  ...props
}: AvatarProps<T>): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : initColor;
  const element = as || (actionable ? 'button' : 'div');
  const translations = useTranslations<AvatarTranslations>({
    customTranslations,
    fallbackTranslations: avatarTranslations,
  });
  const { label } = translations;

  return React.createElement(
    element,
    {
      'aria-label': `${label}: ${initials}`,
      className: cx(
        styles.avatar,
        color && styles[`avatar--${color}`],
        themeId && !unthemed && styles[`avatar--${themeId}`],
        imgSrc && styles['avatar--image'],
        size && styles[`avatar--${size}`],
        actionable && styles['avatar--actionable'],
        className,
      ),
      role: 'img',
      style: { backgroundImage: imgSrc && `url(${imgSrc})`, ...style },
      tabIndex: actionable ? 0 : undefined,
      ...props,
    },
    <div className={styles.avatar__content}>{initials}</div>,
  );
}

Avatar.displayName = 'Avatar';
