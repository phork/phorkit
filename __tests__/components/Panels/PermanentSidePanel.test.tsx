import React from 'react';
import { PermanentSidePanel } from 'lib';
import { render } from '../../utils';

describe('<PermanentSidePanel />', () => {
  it('should render a permanent side panel', () => {
    const { getByText } = render(<PermanentSidePanel position="left">Hello world</PermanentSidePanel>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
