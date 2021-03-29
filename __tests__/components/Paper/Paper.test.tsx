import { render } from '@testing-library/react';
import { Paper } from 'lib';
import * as React from 'react';

describe('<Paper />', () => {
  it('should render a basic paper', () => {
    const { getByText } = render(<Paper>Hello world</Paper>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
