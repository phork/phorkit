import { render } from '@testing-library/react';
import { CardEdge } from 'lib';
import * as React from 'react';

describe('<CardEdge />', () => {
  it('should render a basic card edge', () => {
    const { getByText } = render(<CardEdge>Hello world</CardEdge>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
