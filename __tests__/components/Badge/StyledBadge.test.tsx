import React from 'react';
import { StyledBadge } from 'lib';
import { render } from '../../utils';

const styles = {
  backgroundColor: '#556270',
  textColor: '#fff',
};

describe('<StyledBadge />', () => {
  it('should render a marker badge', () => {
    const { container } = render(<StyledBadge shape="marker" {...styles} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render a point badge', () => {
    const { container } = render(<StyledBadge shape="point" {...styles} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render a count badge', () => {
    const { getByText } = render(
      <StyledBadge shape="count" {...styles}>
        213
      </StyledBadge>,
    );
    expect(getByText('213')).toBeTruthy();
  });

  it('should render a label badge', () => {
    const { getByText } = render(
      <StyledBadge shape="label" {...styles}>
        Beta
      </StyledBadge>,
    );
    expect(getByText('Beta')).toBeTruthy();
  });
});
