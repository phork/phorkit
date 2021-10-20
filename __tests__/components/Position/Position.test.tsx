import React from 'react';
import { Position } from 'lib';
import { render } from '../../utils';

describe('<Position />', () => {
  it('should render a position container', () => {
    const { getByText } = render(<Position location="top-center">Hello world</Position>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
