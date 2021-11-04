import React from 'react';
import { StyledPaper } from 'lib';
import { render } from '../../utils';

const styles = {
  backgroundColor: '#556270',
  borderColor: '#000',
  focusedOutlineColor: '#f41150',
  scrollbarColor: '#ccc',
  textColor: '#fff',
};

describe('<StyledPaper />', () => {
  it('should render a paper', () => {
    const { getByText } = render(<StyledPaper {...styles}>Hello world</StyledPaper>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
