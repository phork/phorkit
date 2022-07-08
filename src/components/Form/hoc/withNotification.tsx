import React from 'react';
import { MergeProps, SemanticColor } from '../../../types';
import { Notification, NotificationProps } from '../Notification';

export type WithNotificationOptions = {
  withDivider?: boolean;
};

export type LocalNotifiedComponentProps = Pick<
  NotificationProps,
  'contrast' | 'hideNotification' | 'notification' | 'width'
> & {
  level: SemanticColor;
};

export type BaseWrappedComponentProps = {
  [key: string]: unknown;
};

export type NotifiedComponentProps<WrappedComponentProps extends BaseWrappedComponentProps> = MergeProps<
  WrappedComponentProps,
  LocalNotifiedComponentProps
>;

/**
 * The withNotification HOC wraps a form input with the
 * Notification component to display a notification under
 * the input.
 */
export function withNotification<WrappedComponentProps extends BaseWrappedComponentProps, E>(
  WrappedComponent: React.FC<WrappedComponentProps>,
  { withDivider = false }: WithNotificationOptions = {},
  componentProps?: Partial<Omit<WrappedComponentProps, 'contrast' | 'width' | 'ref'>>,
) {
  function NotifiedComponent({
    contrast = false,
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
          ref={forwardedRef}
          width={width}
          {...(componentProps as unknown as WrappedComponentProps)}
          {...(props as unknown as WrappedComponentProps)}
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
