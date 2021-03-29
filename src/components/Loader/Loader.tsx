import { cx } from '@emotion/css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProps, IconScale } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { useTranslations } from '../../hooks/useTranslations';
import { SpinnerIcon } from '../../icons/SpinnerIcon';
import styles from './styles/Loader.module.css';

export type LoaderTranslations = {
  loadingLabel: string;
};

export const loaderTranslations: LoaderTranslations = {
  loadingLabel: 'Loading...',
};

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  className?: string;
  position?: 'absolute' | 'fixed';
  size?: number;
  scale?: IconScale;
  translations?: LoaderTranslations;
}

export function Loader({
  className,
  contrast,
  position,
  scale,
  size = 60,
  themeId: initThemeId,
  translations: customTranslations,
  ...props
}: LoaderProps): React.ReactElement<LoaderProps, 'div'> | React.ReactPortal | null {
  const themeId = useThemeId(initThemeId);
  const translations = useTranslations({ customTranslations, fallbackTranslations: loaderTranslations });
  const { loadingLabel } = translations;

  const content = (
    <div
      className={cx(
        styles.loader,
        contrast && styles['loader--contrast'],
        position && styles[`loader--${position}`],
        themeId && styles[`loader--${themeId}`],
        className,
      )}
      {...props}
    >
      <SpinnerIcon title={loadingLabel} scale={scale} size={size} />
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
