import { render } from '@testing-library/react';
import { Notification } from 'lib';
import * as React from 'react';

describe('<Notification />', () => {
  it('should render a basic notification', () => {
    const { getByText } = render(<Notification notification="Basic notification">Main content</Notification>);
    expect(getByText('Basic notification')).toBeTruthy();
    expect(getByText('Main content')).toBeTruthy();
  });
});
