import React from 'react';
import { StyledDivider } from 'lib';
import { render } from '../../utils';

const styles = {
  dividerColor: '#393945',
};

describe('<StyledDivider />', () => {
  it('should render a divider', () => {
    const { container } = render(<StyledDivider {...styles} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
