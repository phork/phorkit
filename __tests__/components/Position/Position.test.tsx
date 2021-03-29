import { render } from '@testing-library/react';
import { Position } from 'lib';
import * as React from 'react';

describe('<Position />', () => {
  it('should render a basic position container', () => {
    const { getByText } = render(<Position location="top-center">Hello world</Position>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
