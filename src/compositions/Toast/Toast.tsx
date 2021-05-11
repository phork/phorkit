import { cx } from '@emotion/css';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { MergeElementPropsWithoutRef, ThemeProps } from '../../types';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
import { useThemeId } from '../../hooks/useThemeId';
import { useTranslations } from '../../hooks/useTranslations';
import { ucfirst } from '../../utils/case';
import { PinIcon } from '../../icons/PinIcon';
import { TimesIcon } from '../../icons/TimesIcon';
import { ButtonColor } from '../../components/Button';
import { IconButton } from '../../components/Button/IconButton';
import { ToastCountdownBar } from './ToastCountdownBar';
import styles from './styles/Toast.module.css';
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

export interface LocalToastProps extends ThemeProps {
  children: React.ReactNode;
  className?: string;
  created?: number;
  duration?: number;
  id?: string;
  immediate?: boolean;
  level?: ToastNotificationLevel;
  /** If another toast (eg. the IconToast) has already set the title Id then don't set it again */
  noTitleIdOnContent?: boolean;
  onClose?: (event: React.MouseEvent | React.KeyboardEvent, id: string) => void;
  onPin?: (event: React.MouseEvent | React.KeyboardEvent, id: string) => void;
  title?: React.ReactNode;
  translations?: ToastTranslations;
  variant?: 'colored';
}

export type ToastProps = MergeElementPropsWithoutRef<'div', LocalToastProps>;

export function Toast({
  children,
  className,
  created,
  duration = 0,
  id: initId,
  immediate,
  level = 'info',
  noTitleIdOnContent,
  onClose,
  onPin,
  themeId: initThemeId,
  title,
  translations: customTranslations,
  variant,
  ...props
}: ToastProps): React.ReactElement<ToastProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  const { setSafeTimeout } = useSafeTimeout();
  const [hasTransitioned, setHasTransitioned] = useState(immediate);
  const { componentId: id, generateTitleId } = useToastComponentIds(initId);
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
    event => {
      onClose && onClose(event, id);
    },
    [id, onClose],
  );

  const handlePin = useCallback(
    event => {
      onPin && onPin(event, id);
    },
    [id, onPin],
  );

  useLayoutEffect(() => {
    !hasTransitioned && setSafeTimeout(() => setHasTransitioned(true), 100);
  }, [hasTransitioned, setSafeTimeout]);

  return (
    <div
      className={cx(
        styles.toast,
        level && level !== 'custom' && styles[`toast--${level}`],
        themeId && styles[`toast--${themeId}`],
        variant && styles[`toast--${variant}`],
        !immediate && styles['toast--transitional'],
        hasTransitioned && styles['has-transitioned'],
        className,
      )}
      role="alertdialog"
      aria-label={`${ucfirst(level)} notification`}
      aria-describedby={generateTitleId()}
      {...props}
    >
      <div className={styles.toastActions}>
        {onPin && duration > 0 && (
          <IconButton aria-label={pinNotificationLabel} themeId={themeId} color={buttonColor} onClick={handlePin}>
            <PinIcon title={pinNotificationLabel} scale="xsmall" />
          </IconButton>
        )}
        {onClose && (
          <IconButton aria-label={closeNotificationLabel} themeId={themeId} color={buttonColor} onClick={handleClose}>
            <TimesIcon title={closeNotificationLabel} scale="xsmall" />
          </IconButton>
        )}
      </div>

      {title && (
        <div id={noTitleIdOnContent ? generateTitleId() : undefined} className={cx(styles.toastTitle)}>
          {title}
        </div>
      )}
      {children && <div id={!title && !noTitleIdOnContent ? generateTitleId() : undefined}>{children}</div>}
      {duration > 0 && created && (
        <ToastCountdownBar created={created} duration={duration} level={level} themeId={themeId} variant={variant} />
      )}
    </div>
  );
}

Toast.displayName = 'Toast';
