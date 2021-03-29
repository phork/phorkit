import React from 'react';
import { ThemeProps } from '../../types';
import { ToastContainerPosition } from './types';
import { useThemeId } from '../../hooks/useThemeId';
import { ToastConsumer } from './ToastConsumer';
import { ToastContainer } from './ToastContainer';
import { ToastFromContext } from './ToastFromContext';
import { ToastProvider } from './ToastProvider';

export interface ToastsProps extends ThemeProps {
  children: React.ReactNode;
  position: ToastContainerPosition;
  variant?: 'colored';
}

export function Toasts({ children, themeId: initThemeId, variant, ...props }: ToastsProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);

  return (
    <ToastProvider {...props}>
      <ToastConsumer>
        {({ pinNotification, removeNotification, notifications }) => (
          <React.Fragment>
            {children}
            {notifications.size ? (
              <ToastContainer {...props}>
                {[...notifications.values()].map(element => (
                  <ToastFromContext
                    element={element}
                    key={element.props.id}
                    pinNotification={pinNotification}
                    removeNotification={removeNotification}
                    themeId={themeId}
                    variant={variant}
                  />
                ))}
              </ToastContainer>
            ) : null}
          </React.Fragment>
        )}
      </ToastConsumer>
    </ToastProvider>
  );
}
