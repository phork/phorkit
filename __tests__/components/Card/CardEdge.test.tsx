import { render } from '@testing-library/react';
import React from 'react';
import { CardEdge } from 'lib';

describe('<CardEdge />', () => {
  it('should render a basic card edge', () => {
    const { getByText } = render(<CardEdge>Hello world</CardEdge>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
