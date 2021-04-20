import { render } from '@testing-library/react';
import React from 'react';
import { MainPanel } from 'lib';

describe('<MainPanel />', () => {
  it('should render a main panel', () => {
    const { getByText } = render(<MainPanel>Hello world</MainPanel>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
