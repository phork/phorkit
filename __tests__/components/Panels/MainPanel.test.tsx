import { render } from '@testing-library/react';
import { MainPanel } from 'lib';
import * as React from 'react';

describe('<MainPanel />', () => {
  it('should render a main panel', () => {
    const { getByText } = render(<MainPanel>Hello world</MainPanel>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
