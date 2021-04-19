import { render } from '@testing-library/react';
import * as React from 'react';
import { Paper } from 'lib';

describe('<Paper />', () => {
  it('should render a basic paper', () => {
    const { getByText } = render(<Paper>Hello world</Paper>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
