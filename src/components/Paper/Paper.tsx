import { cx } from '@emotion/css';
import React from 'react';
import { AccentColor, SequentialVariant, StateColor, ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility/useAccessibility';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Paper.module.css';

export type PaperProps = React.HTMLAttributes<HTMLDivElement> &
  Omit<ThemeProps, 'contrast'> & {
    bordered?: boolean;
    children: React.ReactChild | React.ReactFragment;
    className?: string;
    color?: StateColor | SequentialVariant | AccentColor | 'contrast' | 'transparent' | 'extreme';
    /** This is used when the paper is contained within a relative element and should fill it */
    contained?: boolean;
    /** The container is used to apply predefined padding to the paper */
    container?: 'banner' | 'page' | 'panel' | 'popover';
    /** The flexible flag sets the paper's display type to flex */
    flexible?: boolean;
    /** The full flag sets the paper's width and height to 100% */
    full?: boolean;
    scrollable?: boolean;
    scrollbar?: 'xsmall' | 'small' | 'medium';
    style?: React.CSSProperties;
  };

/**
 * The paper component sets the background color and the
 * text color of its children and can add an optional border
 * as well. Paper can have a container which determines
 * the amount of padding based on the type of container
 * and the viewport size. And it can expand, overflow or
 * be scrollable with a customized scrollbar size.
 *
 * Scrollable paper has a `tabIndex` on it because scrollable
 * regions should be focusable.
 */
export const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  (
    {
      bordered = false,
      children,
      className,
      color,
      contained = false,
      container,
      flexible = false,
      full = false,
      scrollable = false,
      scrollbar = 'medium',
      themeId: initThemeId,
      unthemed = false,
      ...props
    },
    forwardedRef,
  ): React.ReactElement<PaperProps> => {
    const themeId = useThemeId(initThemeId);
    const accessible = useAccessibility();

    return (
      <div
        className={cx(
          styles.paper,
          bordered && styles['paper--bordered'],
          color && styles[`paper--${color}`],
          contained && styles['paper--contained'],
          container && styles[`paper--${container}`],
          flexible && styles['paper--flexible'],
          full && styles['paper--full'],
          scrollable && styles['paper--scrollable'],
          scrollbar && styles[`paper--${scrollbar}-scrollbar`],
          themeId && !unthemed && styles[`paper--${themeId}`],
          accessible && styles['is-accessible'],
          className,
        )}
        ref={forwardedRef}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={scrollable ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Paper.displayName = 'Paper';
