import React from 'react';
import { Notification } from 'lib';
import { render } from '../../../utils';

describe('<Notification />', () => {
  it('should render a notification', () => {
    const { getByText } = render(<Notification notification="Basic notification">Main content</Notification>);
    expect(getByText('Basic notification')).toBeTruthy();
    expect(getByText('Main content')).toBeTruthy();
  });

  it('should not render a hidden notification', () => {
    const { getByText } = render(
      <Notification hideNotification notification="Basic notification">
        Main content
      </Notification>,
    );
    expect(() => getByText('Basic notification')).toThrow();
    expect(getByText('Main content')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <Notification
        contrast
        divided
        className="notification"
        color="danger"
        id="notification"
        notification="Basic notification"
        style={{ color: 'red' }}
        themeId="dark"
        width={100}
      >
        Main content
      </Notification>,
    );

    const notification = document.getElementById('notification');
    expect(notification?.nodeName).toBe('DIV');
    expect(notification?.style.getPropertyValue('color')).toBe('red');
  });
});
