import { render } from '@testing-library/react';
import { Typography } from 'lib';
import * as React from 'react';

describe('<Typography />', () => {
  it('should render a basic typography element', () => {
    const { getByText } = render(<Typography>Hello world</Typography>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
