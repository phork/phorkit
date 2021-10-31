import React, { useContext } from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { ToastProps } from './Toast';
import { ToastContext } from './ToastContext';

export type ToastWithContextItemType = React.ReactElement<
  Omit<ToastProps, 'contextId'> & {
    /* A toast with context is used with the toast system and requires a context id */
    contextId: string;
    permanent?: boolean;
  }
>;

export type ToastFromContextProps = ThemeProps & {
  toast: ToastWithContextItemType;
  variant?: 'colored';
};

/**
 * This accepts a `Toast` element with a `contextId` prop
 * and it clones the toast and passes it an `onPin` prop
 * that can be used to stop the timed removal, and an
 * `onClose` prop that can be used to the remove the toast
 * from the state.
 */
export function ToastFromContext({ toast, themeId: initThemeId, variant }: ToastFromContextProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const { pinNotification, removeNotification } = useContext(ToastContext);
  const { duration, contextId, permanent } = toast.props;

  return React.cloneElement(toast, {
    duration: permanent ? 0 : duration,
    onClose: permanent ? undefined : () => removeNotification(contextId),
    onPin: permanent ? undefined : () => pinNotification(contextId),
    themeId,
    variant,
  });
}
