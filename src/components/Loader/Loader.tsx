import { cx } from '@emotion/css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProps, IconScale } from '../../types';
import { useThemeId } from '../../context/Theme';
import { useTranslations } from '../../hooks/useTranslations';
import { SpinnerIcon } from '../../icons/SpinnerIcon';
import styles from './styles/Loader.module.css';

export type LoaderTranslations = {
  loadingLabel: string;
};

export const loaderTranslations: LoaderTranslations = {
  loadingLabel: 'Loading...',
};

export type LoaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> &
  ThemeProps & {
    className?: string;
    position?: 'relative' | 'absolute' | 'fixed';
    scale?: Exclude<IconScale, 'xsmall'>;
    size?: number;
    style?: React.CSSProperties;
    translations?: Partial<LoaderTranslations>;
  };

/**
 * An SVG spinner icon with a custom size or scale. It
 * can be positioned relatively, absolutely or fixed.
 * When positioned absolutely or fixed it will be
 * centered in its container.
 */
export function Loader({
  className,
  contrast = false,
  position = 'relative',
  scale,
  size = 60,
  themeId: initThemeId,
  translations: customTranslations,
  unthemed = false,
  ...props
}: LoaderProps): JSX.Element | React.ReactPortal | null {
  const themeId = useThemeId(initThemeId);
  const translations = useTranslations<LoaderTranslations>({
    customTranslations,
    fallbackTranslations: loaderTranslations,
  });
  const { loadingLabel } = translations;

  const content = (
    <div
      aria-busy="true"
      aria-label={loadingLabel}
      aria-live="polite"
      className={cx(
        styles.loader,
        contrast && styles['loader--contrast'],
        position && styles[`loader--${position}`],
        themeId && !unthemed && styles[`loader--${themeId}`],
        className,
      )}
      role="status"
      {...props}
    >
      <SpinnerIcon
        aria-hidden={true}
        focusable={false}
        scale={scale}
        size={scale ? undefined : size}
        title={loadingLabel}
      />
    </div>
  );

  if (position === 'fixed') {
    if (typeof document !== 'undefined') {
      return ReactDOM.createPortal(content, document.body);
    }
    return null;
  }
  return content;
}

Loader.displayName = 'Loader';
