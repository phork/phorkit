import { render } from '@testing-library/react';
import { Card } from 'lib';
import * as React from 'react';

describe('<Card />', () => {
  it('should render a basic card', () => {
    const { getByText } = render(<Card>Hello world</Card>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
