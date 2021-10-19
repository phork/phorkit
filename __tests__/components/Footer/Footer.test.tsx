import React from 'react';
import { Footer } from 'lib';
import { render } from '../../utils';

describe('<Footer />', () => {
  it('should render a basic footer', () => {
    const { getByText } = render(<Footer>Hello world</Footer>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
