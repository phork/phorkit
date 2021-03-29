import { render } from '@testing-library/react';
import { PermanentStackPanel } from 'lib';
import * as React from 'react';

describe('<PermanentStackPanel />', () => {
  it('should render a permanent stack panel', () => {
    const { getByText } = render(<PermanentStackPanel position="top">Hello world</PermanentStackPanel>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
