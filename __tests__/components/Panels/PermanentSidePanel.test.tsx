import { render } from '@testing-library/react';
import { PermanentSidePanel } from 'lib';
import * as React from 'react';

describe('<PermanentSidePanel />', () => {
  it('should render a permanent side panel', () => {
    const { getByText } = render(<PermanentSidePanel position="left">Hello world</PermanentSidePanel>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
