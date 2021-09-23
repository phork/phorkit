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

type LoaderSize = {
  scale?: never;
  size?: number;
};

type LoaderScale = {
  scale?: Exclude<IconScale, 'xsmall'>;
  size?: never;
};

export interface BaseLoaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, ThemeProps {
  className?: string;
  position?: 'relative' | 'absolute' | 'fixed';
  style?: React.CSSProperties;
  translations?: LoaderTranslations;
}

export type LoaderProps = BaseLoaderProps & (LoaderSize | LoaderScale);

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
}: LoaderProps): React.ReactElement<LoaderProps> | React.ReactPortal | null {
  const themeId = useThemeId(initThemeId);
  const translations = useTranslations({ customTranslations, fallbackTranslations: loaderTranslations });
  const { loadingLabel } = translations;

  const content = (
    <div
      className={cx(
        styles.loader,
        contrast && styles['loader--contrast'],
        position && styles[`loader--${position}`],
        themeId && !unthemed && styles[`loader--${themeId}`],
        className,
      )}
      {...props}
    >
      <SpinnerIcon scale={scale} size={scale ? undefined : size} title={loadingLabel} />
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
