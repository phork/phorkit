import React from 'react';
import { StyledFooter } from 'lib';
import { render } from '../../utils';

const styles = {
  backgroundColor: '#556270',
  borderColor: '#393a61',
  textColor: '#fff',
  height: 50,
};

describe('<StyledFooter />', () => {
  it('should render a footer', () => {
    const { getByText } = render(<StyledFooter {...styles}>Hello world</StyledFooter>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
