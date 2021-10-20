import { render } from '@testing-library/react';
import React from 'react';
import { Shade } from 'lib';

describe('<Shade />', () => {
  it('should render a shade', () => {
    const { queryByText } = render(<Shade color="primary">Hello world</Shade>);
    expect(queryByText('Hello world')).toBeTruthy();
  });
});
