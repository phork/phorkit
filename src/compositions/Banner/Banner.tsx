import { cx } from '@emotion/css';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { SequentialVariant, StateColor, ThemeProps } from '../../types';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
import { useThemeId } from '../../hooks/useThemeId';
import { useTranslations } from '../../hooks/useTranslations';
import { TimesIcon } from '../../icons/TimesIcon';
import { IconButton } from '../../components/Button/IconButton';
import { Flex } from '../../components/Flex/Flex';
import { PaperProps, Paper } from '../../components/Paper/Paper';
import { Position } from '../../components/Position/Position';
import { Rhythm } from '../../components/Rhythm/Rhythm';
import styles from './styles/Banner.module.css';

export type BannerTranslations = {
  closeLabel: string;
};

export const bannerTranslations: BannerTranslations = {
  closeLabel: 'Close banner',
};

export interface BannerProps extends Omit<React.HTMLAttributes<PaperProps>, 'id'>, ThemeProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  immediate?: boolean;
  level: StateColor | SequentialVariant | 'info' | 'contrast' | 'transparent';
  onClose?: (event: React.MouseEvent | React.KeyboardEvent, id?: string) => void;
  style?: React.CSSProperties;
  translations?: BannerTranslations;
}

export function Banner({
  children,
  className,
  id,
  immediate,
  level,
  onClose,
  style,
  themeId: initThemeId,
  translations: customTranslations,
}: BannerProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const { setSafeTimeout } = useSafeTimeout();
  const [hasTransitioned, setHasTransitioned] = useState(immediate);
  const translations = useTranslations<BannerTranslations>({
    customTranslations,
    fallbackTranslations: bannerTranslations,
  });
  const { closeLabel } = translations;

  const handleClose = useCallback(
    event => {
      onClose && onClose(event, id);
    },
    [id, onClose],
  );

  useLayoutEffect(() => {
    !hasTransitioned && setSafeTimeout(() => setHasTransitioned(true), 100);
  }, [hasTransitioned, setSafeTimeout]);

  const isColoredBanner = !['primary', 'secondary', 'tertiary', 'transparent'].includes(level);

  return (
    <Paper
      className={cx(
        styles.banner,
        level && styles[`banner--${level}`],
        !immediate && styles['banner--transitional'],
        hasTransitioned && styles['has-transitioned'],
        className,
      )}
      color={level === 'info' ? 'accent-primary' : level}
      container="banner"
      role="banner"
      themeId={themeId}
      style={style}
    >
      <Flex flexible alignItems="center" style={{ position: 'relative' }}>
        {children}

        {onClose && (
          <Position location="right-center" variant="outside">
            <Rhythm p={2} wrapper="div">
              <IconButton
                aria-label={closeLabel}
                color="neutral"
                contrast={isColoredBanner}
                themeId={themeId}
                onClick={handleClose}
              >
                <TimesIcon title={closeLabel} scale="xsmall" />
              </IconButton>
            </Rhythm>
          </Position>
        )}
      </Flex>
    </Paper>
  );
}

Banner.displayName = 'Banner';
