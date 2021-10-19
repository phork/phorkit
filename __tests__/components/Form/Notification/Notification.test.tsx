import React from 'react';
import { Notification } from 'lib';
import { render } from '../../../utils';

describe('<Notification />', () => {
  it('should render a basic notification', () => {
    const { getByText } = render(<Notification notification="Basic notification">Main content</Notification>);
    expect(getByText('Basic notification')).toBeTruthy();
    expect(getByText('Main content')).toBeTruthy();
  });
});
