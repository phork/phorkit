import React from 'react';
import { StyledHeader } from 'lib';
import { render } from '../../utils';

const styles = {
  backgroundColor: '#556270',
  borderColor: '#393a61',
  textColor: '#fff',
  height: 50,
};

describe('<StyledHeader />', () => {
  it('should render a footer', () => {
    const { getByText } = render(<StyledHeader {...styles}>Hello world</StyledHeader>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
