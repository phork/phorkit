import React, { useContext } from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { ToastProps } from './Toast';
import { ToastContext } from './ToastContext';

/* a toast with context is used with the toast system and requires a context id */
export type ToastWithContextItemType = React.ReactElement<
  Omit<ToastProps, 'contextId'> & {
    contextId: string;
    permanent?: boolean;
  }
>;

export interface ToastFromContextProps extends ThemeProps {
  toast: ToastWithContextItemType;
  variant?: 'colored';
}

export function ToastFromContext({
  toast,
  themeId: initThemeId,
  variant,
}: ToastFromContextProps): React.ReactElement<ToastProps> {
  const themeId = useThemeId(initThemeId);
  const { pinNotification, removeNotification } = useContext(ToastContext);
  const { duration, contextId, permanent } = toast.props;

  return React.cloneElement(toast, {
    duration: permanent ? 0 : duration,
    onClose: permanent ? undefined : () => removeNotification(contextId),
    onPin: permanent ? undefined : () => pinNotification(contextId),
    // this effectively removes the permanent prop which is invalid on <Toast>
    permanent: undefined,
    themeId,
    variant,
  });
}
