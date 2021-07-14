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
  immediate = false,
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
      style={style}
      themeId={themeId}
    >
      <Flex flexible alignItems="center" style={{ position: 'relative' }}>
        {children}

        {onClose && (
          <Position location="right-center" variant="outside">
            <Rhythm ml={-1} p={2}>
              <IconButton
                noHeight
                aria-label={closeLabel}
                color="neutral"
                contrast={isColoredBanner}
                onClick={handleClose}
                shape="square"
                themeId={themeId}
                weight="ghost"
              >
                <TimesIcon scale="xsmall" title={closeLabel} />
              </IconButton>
            </Rhythm>
          </Position>
        )}
      </Flex>
    </Paper>
  );
}

Banner.displayName = 'Banner';
