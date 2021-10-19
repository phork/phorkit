import React from 'react';
import { PermanentStackPanel } from 'lib';
import { render } from '../../utils';

describe('<PermanentStackPanel />', () => {
  it('should render a permanent stack panel', () => {
    const { getByText } = render(<PermanentStackPanel position="top">Hello world</PermanentStackPanel>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
