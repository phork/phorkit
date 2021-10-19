import React from 'react';
import { Card } from 'lib';
import { render } from '../../utils';

describe('<Card />', () => {
  it('should render a basic card', () => {
    const { getByText } = render(<Card>Hello world</Card>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
