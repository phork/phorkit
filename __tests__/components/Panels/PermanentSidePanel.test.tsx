import { render } from '@testing-library/react';
import * as React from 'react';
import { PermanentSidePanel } from 'lib';

describe('<PermanentSidePanel />', () => {
  it('should render a permanent side panel', () => {
    const { getByText } = render(<PermanentSidePanel position="left">Hello world</PermanentSidePanel>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
