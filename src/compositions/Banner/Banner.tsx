import { cx } from '@emotion/css';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { SequentialVariant, StateColor, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
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

export interface BannerProps
  extends Omit<PaperProps, 'bordered' | 'children' | 'color' | 'contained' | 'container' | 'flexible' | 'full'>,
    Omit<ThemeProps, 'contrast' | 'unthemed'> {
  children: React.ReactChild | React.ReactFragment;
  className?: string;
  /** The context ID is used by the banner system */
  contextId?: string;
  /** The immediate flag removes the entry animation */
  immediate?: boolean;
  level: StateColor | SequentialVariant | 'info' | 'contrast' | 'transparent';
  onClose?: (event?: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, contextId?: string) => void;
  /** Permanent banners don't have a close button */
  permanent?: boolean;
  style?: React.CSSProperties;
  translations?: Partial<BannerTranslations>;
}

/**
 * A banner is a simple horizontal bar that spans the
 * full width of its container. It has a background
 * color based on the level prop and a close button
 * if it's not permanent and an onClose prop is passed.
 *
 * Banners have a small animation on the initial render
 * unless the `immediate` flag is set.
 *
 * This uses the `IconButton`, `Flex`, `Paper`, `Position`
 * and `Rhythm` components.
 */
export function Banner({
  children,
  className,
  contextId,
  immediate = false,
  level = 'info',
  onClose,
  permanent,
  style,
  themeId: initThemeId,
  translations: customTranslations,
  ...props
}: BannerProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const { setSafeTimeout } = useSafeTimeout();
  const [hasTransitioned, setHasTransitioned] = useState(immediate);
  const translations = useTranslations<BannerTranslations>({
    customTranslations,
    fallbackTranslations: bannerTranslations,
  });
  const { closeLabel } = translations;

  const handleClose = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent): void => {
      onClose && onClose(event, contextId);
    },
    [contextId, onClose],
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
      color={level === 'info' ? 'accent' : level}
      container="banner"
      style={style}
      themeId={themeId}
      {...props}
    >
      <Flex flexible alignItems="center" style={{ position: 'relative' }}>
        {children}

        {onClose && !permanent && (
          <Position location="right-center" variant="outside">
            <Rhythm ml={-1} p={2}>
              <IconButton<'button'>
                noHeight
                aria-label={closeLabel}
                as="button"
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
