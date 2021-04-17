import React from 'react';
import { ThemeProps } from '../../types';
import { ToastContainerPosition } from './types';
import { useThemeId } from '../../hooks/useThemeId';
import { ToastConsumer } from './ToastConsumer';
import { ToastContainer } from './ToastContainer';
import { ToastFromContext } from './ToastFromContext';

export interface ToastsFromContextProps extends ThemeProps {
  position: ToastContainerPosition;
  variant?: 'colored';
}

export function ToastsFromContext({
  themeId: initThemeId,
  variant,
  ...props
}: ToastsFromContextProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);

  return (
    <ToastConsumer>
      {({ pinNotification, removeNotification, notifications }) => (
        <React.Fragment>
          {notifications.size ? (
            <ToastContainer {...props}>
              {[...notifications.values()].map(element => (
                <ToastFromContext
                  element={element}
                  key={element.props.id}
                  pinNotification={pinNotification}
                  removeNotification={removeNotification}
                  themeId={themeId}
                  variant={element.props.variant || variant}
                />
              ))}
            </ToastContainer>
          ) : null}
        </React.Fragment>
      )}
    </ToastConsumer>
  );
}
