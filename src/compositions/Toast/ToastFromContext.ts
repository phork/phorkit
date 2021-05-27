import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { ToastItemType } from './types';

export interface ToastFromContextProps extends ThemeProps {
  element: ToastItemType;
  pinNotification: (id: string) => void;
  removeNotification: (id: string) => void;
  variant?: 'colored';
}

export function ToastFromContext({
  element,
  pinNotification,
  removeNotification,
  themeId: initThemeId,
  variant,
}: ToastFromContextProps) {
  const themeId = useThemeId(initThemeId);
  const { duration, id, permanent } = element.props;

  return React.cloneElement(element, {
    duration: permanent ? 0 : duration,
    onClose: permanent ? undefined : () => removeNotification(id),
    onPin: () => (permanent ? undefined : pinNotification(id)),
    // this effectively removes the permanent prop which is invalid on <Toast>
    permanent: undefined,
    themeId,
    variant,
  });
}
