import { cx } from '@emotion/css';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { MergeElementPropsWithoutRef, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
import { useTranslations } from '../../hooks/useTranslations';
import { ucfirst } from '../../utils/case';
import { PinIcon } from '../../icons/PinIcon';
import { TimesIcon } from '../../icons/TimesIcon';
import { ButtonColor } from '../../components/Button';
import { IconButton } from '../../components/Button/IconButton';
import styles from './styles/Toast.module.css';
import { ToastCountdownBar } from './ToastCountdownBar';
import { ToastNotificationLevel } from './types';
import { useToastComponentIds } from './useToastComponentIds';

export type ToastTranslations = {
  closeNotificationLabel: string;
  pinNotificationLabel: string;
};

export const toastTranslations: ToastTranslations = {
  closeNotificationLabel: 'Close notification',
  pinNotificationLabel: 'Pin notification',
};

export type LocalToastProps = Omit<ThemeProps, 'contrast'> & {
  children: React.ReactChild | React.ReactFragment;
  className?: string;
  /** The context ID is used by both the toast system and the aria-label system */
  contextId?: string;
  /** The value of `Date.now()` when the toast was created */
  created?: number;
  /** The number of milliseconds before the toast is removed */
  duration?: number;
  /** The immediate flag removes the entry animation */
  immediate?: boolean;
  level?: ToastNotificationLevel;
  onClose?: (event?: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, id?: string) => void;
  onPin?: (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, id?: string) => void;
  /** Permanent toasts don't have a close button */
  permanent?: boolean;
  style?: React.CSSProperties;
  translations?: Partial<ToastTranslations>;
  variant?: 'colored';
};

export type ToastProps = MergeElementPropsWithoutRef<'div', LocalToastProps>;

/**
 * A toast is a small notification that pops up. It has
 * a background color based on the level prop and a close
 * button if it's not permanent and an `onClose` prop is
 * passed.
 *
 * If a `duration` is passed a countdown bar will be shown
 * and the toast will be removed after that time. If it
 * has an `onPin` callback it will have a pin button that
 * can be used to stop the the removal countdown.
 *
 * Toasts have a small animation on the initial render
 * unless the `immediate` flag is set.
 *
 * This uses the `Button` and `IconButton` components.
 */
export function Toast({
  children,
  className,
  created,
  duration = 0,
  contextId,
  immediate = false,
  level = 'info',
  onClose,
  onPin,
  permanent,
  themeId: initThemeId,
  translations: customTranslations,
  unthemed,
  variant,
  ...props
}: ToastProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const { setSafeTimeout } = useSafeTimeout();
  const [hasTransitioned, setHasTransitioned] = useState(immediate);
  const { generateTitleId } = useToastComponentIds(contextId);
  const translations = useTranslations<ToastTranslations>({
    customTranslations,
    fallbackTranslations: toastTranslations,
  });
  const { closeNotificationLabel, pinNotificationLabel } = translations;

  let buttonColor: ButtonColor = 'neutral';
  if (variant === 'colored') {
    buttonColor = themeId === 'dark' ? 'black' : 'white';
  }

  const handleClose = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent): void => {
      onClose && onClose(event, contextId);
    },
    [contextId, onClose],
  );

  const handlePin = useCallback(
    event => {
      onPin && onPin(event, contextId);
    },
    [contextId, onPin],
  );

  useLayoutEffect(() => {
    !hasTransitioned && setSafeTimeout(() => setHasTransitioned(true), 100);
  }, [hasTransitioned, setSafeTimeout]);

  return (
    <div
      aria-describedby={generateTitleId()}
      aria-label={`${ucfirst(level)} notification`}
      className={cx(
        styles.toast,
        level && !unthemed && styles[`toast--${level}`],
        themeId && styles[`toast--${themeId}`],
        variant && styles[`toast--${variant}`],
        !immediate && styles['toast--transitional'],
        hasTransitioned && styles['has-transitioned'],
        className,
      )}
      role="alertdialog"
      {...props}
    >
      <div className={styles.toastActions}>
        {onPin && duration > 0 && (
          <IconButton<'button'>
            aria-label={pinNotificationLabel}
            as="button"
            color={buttonColor}
            onClick={handlePin}
            themeId={themeId}
          >
            <PinIcon scale="xsmall" title={pinNotificationLabel} />
          </IconButton>
        )}
        {onClose && !permanent && (
          <IconButton<'button'>
            aria-label={closeNotificationLabel}
            as="button"
            color={buttonColor}
            onClick={handleClose}
            themeId={themeId}
          >
            <TimesIcon scale="xsmall" title={closeNotificationLabel} />
          </IconButton>
        )}
      </div>

      {children}
      {duration > 0 && created && (
        <ToastCountdownBar created={created} duration={duration} level={level} themeId={themeId} variant={variant} />
      )}
    </div>
  );
}

Toast.displayName = 'Toast';
