import React from 'react';
import { MainPanel } from 'lib';
import { render } from '../../utils';

describe('<MainPanel />', () => {
  it('should render a main panel', () => {
    const { getByText } = render(<MainPanel>Hello world</MainPanel>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
