import React from 'react';
import { StyledLabel } from 'lib';
import { render } from '../../../utils';

const styles = {
  lineHeight: 1,
  fontSize: 20,
  mutedTextColor: '#81BCFF',
  textColor: '#0060ce',
};

describe('<StyledLabel />', () => {
  it('should render a label', () => {
    const { getByText } = render(<StyledLabel {...styles}>Hello world</StyledLabel>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render as a div', () => {
    const { container } = render(<StyledLabel {...styles}>Hello world</StyledLabel>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
