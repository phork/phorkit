import React from 'react';
import { MergeProps, SemanticColor } from '../../../types';
import { Notification, NotificationProps } from '../Notification';

export type WithNotificationOptions = {
  withDivider?: boolean;
};

export interface LocalNotifiedComponentProps
  extends Pick<NotificationProps, 'contrast' | 'hideNotification' | 'notification' | 'width'> {
  level: SemanticColor;
}

export type NotifiedComponentProps<WrappedComponentProps extends {}> = MergeProps<
  WrappedComponentProps,
  LocalNotifiedComponentProps
>;

export function withNotification<WrappedComponentProps, E extends HTMLElement>(
  WrappedComponent: React.FC<WrappedComponentProps>,
  { withDivider }: WithNotificationOptions = {},
) {
  function NotifiedComponent({
    contrast,
    forwardedRef,
    hideNotification,
    level = 'neutral',
    notification,
    width,
    ...props
  }: NotifiedComponentProps<WrappedComponentProps> & { forwardedRef: React.ForwardedRef<E> }): React.ReactElement {
    return (
      <Notification
        color={level}
        contrast={contrast}
        divided={withDivider}
        hideNotification={hideNotification}
        notification={notification}
        width={width}
      >
        <WrappedComponent
          contrast={contrast}
          width={width}
          ref={forwardedRef}
          {...((props as unknown) as WrappedComponentProps)}
        />
      </Notification>
    );
  }

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  NotifiedComponent.displayName = `withNotification(${displayName})`;

  return React.forwardRef<E, NotifiedComponentProps<WrappedComponentProps>>((props, ref) => (
    <NotifiedComponent forwardedRef={ref} {...props} />
  ));
}