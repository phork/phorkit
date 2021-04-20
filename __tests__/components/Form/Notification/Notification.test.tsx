import { render } from '@testing-library/react';
import React from 'react';
import { Notification } from 'lib';

describe('<Notification />', () => {
  it('should render a basic notification', () => {
    const { getByText } = render(<Notification notification="Basic notification">Main content</Notification>);
    expect(getByText('Basic notification')).toBeTruthy();
    expect(getByText('Main content')).toBeTruthy();
  });
});
