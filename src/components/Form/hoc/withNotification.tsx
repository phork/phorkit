import React from 'react';
import { SemanticColor } from '../../../types';
import { Notification, NotificationProps } from '../Notification';

export type WithNotificationOptions = {
  withDivider?: boolean;
};

export interface NotifiedComponentProps
  extends Pick<NotificationProps, 'contrast' | 'hideNotification' | 'notification' | 'width'> {
  level: SemanticColor;
}

export function withNotification(WrappedComponent: React.FC<any>, { withDivider }: WithNotificationOptions = {}) {
  function NotifiedComponent(
    { contrast, hideNotification, level = 'neutral', notification, width, ...props }: NotifiedComponentProps,
    forwardedRef: React.ForwardedRef<HTMLElement>,
  ): React.ReactElement {
    return (
      <Notification
        color={level}
        contrast={contrast}
        divided={withDivider}
        hideNotification={hideNotification}
        notification={notification}
        width={width}
      >
        <WrappedComponent contrast={contrast} width={width} ref={forwardedRef} {...props} />
      </Notification>
    );
  }

  return React.forwardRef(NotifiedComponent) as typeof NotifiedComponent;
}
