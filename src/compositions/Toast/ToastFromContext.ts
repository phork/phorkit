import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { ToastProps } from './Toast';

/* a toast in context is used with the toast system and requires a context id */
export type ToastWithContextItemType = React.ReactElement<
  Omit<ToastProps, 'contextId'> & {
    contextId: string;
    permanent?: boolean;
  }
>;

export interface ToastFromContextProps extends ThemeProps {
  element: ToastWithContextItemType;
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
  const { duration, contextId, permanent } = element.props;

  return React.cloneElement(element, {
    duration: permanent ? 0 : duration,
    onClose: permanent ? undefined : () => removeNotification(contextId),
    onPin: () => (permanent ? undefined : pinNotification(contextId)),
    // this effectively removes the permanent prop which is invalid on <Toast>
    permanent: undefined,
    themeId,
    variant,
  });
}
