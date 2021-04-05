import { cx } from '@emotion/css';
import React from 'react';
import { AsType, MergeElementProps, ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { useTranslations } from '../../hooks/useTranslations';
import styles from './styles/Avatar.module.css';

export type AvatarTranslations = {
  label: string;
};

export const avatarTranslations: AvatarTranslations = {
  label: 'Avatar',
};

export interface LocalAvatarProps extends ThemeProps {
  actionable?: boolean;
  className?: string;
  color?: 'neutral' | 'primary';
  imgSrc?: string;
  initials?: string;
  size?: 'xsmall' | 'small';
  style?: React.CSSProperties;
  translations?: AvatarTranslations;
}

export type AvatarProps<T extends React.ElementType = 'div'> = AsType<T> & MergeElementProps<T, LocalAvatarProps>;

export function Avatar<T extends React.ElementType = 'div'>({
  actionable,
  as,
  className,
  color: initColor,
  contrast,
  imgSrc,
  initials,
  size,
  style,
  themeId: initThemeId,
  translations: customTranslations,
  unthemed,
  ...props
}: AvatarProps<T>): React.ReactElement<AvatarProps, T> {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : initColor;
  const Element = as || (actionable ? 'button' : 'div');
  const translations = useTranslations<AvatarTranslations>({
    customTranslations,
    fallbackTranslations: avatarTranslations,
  });
  const { label } = translations;

  return (
    <Element
      className={cx(
        styles.avatar,
        color && styles[`avatar--${color}`],
        themeId && !unthemed && styles[`avatar--${themeId}`],
        imgSrc && styles['avatar--image'],
        size && styles[`avatar--${size}`],
        actionable && styles['avatar--actionable'],
        className,
      )}
      style={{ backgroundImage: imgSrc && `url(${imgSrc})`, ...style }}
      tabIndex={actionable ? 0 : undefined}
      aria-label={label}
      {...props}
    >
      <div className={styles.avatar__content}>{initials}</div>
    </Element>
  );
}
