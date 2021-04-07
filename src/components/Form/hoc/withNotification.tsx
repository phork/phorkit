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

export function withNotification<P = {}, E extends HTMLElement = HTMLElement>(
  WrappedComponent: React.FC<P>,
  { withDivider }: WithNotificationOptions = {},
) {
  function NotifiedComponent(
    { contrast, hideNotification, level = 'neutral', notification, width, ...props }: NotifiedComponentProps,
    forwardedRef: React.ForwardedRef<E>,
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
        <WrappedComponent contrast={contrast} width={width} ref={forwardedRef} {...(props as P)} />
      </Notification>
    );
  }

  return React.forwardRef(NotifiedComponent) as typeof NotifiedComponent;
}
