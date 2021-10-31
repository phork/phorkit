import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { ToastConsumer } from './ToastConsumer';
import { ToastContainer, ToastContainerProps } from './ToastContainer';
import { ToastFromContext } from './ToastFromContext';
import { ToastContainerPosition } from './types';

export type ToastsFromContextProps = Omit<ToastContainerProps, 'children'> &
  Omit<ThemeProps, 'contrast' | 'unthemed'> & {
    position: ToastContainerPosition;
    style?: React.CSSProperties;
    variant?: 'colored';
  };

/**
 * This consumes the toasts from the `ToastProvider`
 * and displays them all.
 */
export function ToastsFromContext({ themeId: initThemeId, variant, ...props }: ToastsFromContextProps): JSX.Element {
  const themeId = useThemeId(initThemeId);

  return (
    <ToastConsumer>
      {({ notifications }) => (
        <React.Fragment>
          {notifications.size ? (
            <ToastContainer {...props}>
              {[...notifications.values()].map(toast => (
                <ToastFromContext
                  key={toast.props.contextId}
                  themeId={themeId}
                  toast={toast}
                  variant={toast.props.variant || variant}
                />
              ))}
            </ToastContainer>
          ) : null}
        </React.Fragment>
      )}
    </ToastConsumer>
  );
}
