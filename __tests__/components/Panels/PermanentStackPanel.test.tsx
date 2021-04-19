import { render } from '@testing-library/react';
import * as React from 'react';
import { PermanentStackPanel } from 'lib';

describe('<PermanentStackPanel />', () => {
  it('should render a permanent stack panel', () => {
    const { getByText } = render(<PermanentStackPanel position="top">Hello world</PermanentStackPanel>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
