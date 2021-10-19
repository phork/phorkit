import React from 'react';
import { Paper } from 'lib';
import { render } from '../../utils';

describe('<Paper />', () => {
  it('should render a basic paper', () => {
    const { getByText } = render(<Paper>Hello world</Paper>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
