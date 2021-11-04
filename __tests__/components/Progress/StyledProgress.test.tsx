import React from 'react';
import { StyledProgress } from 'lib';
import { render } from '../../utils';

const styles = {
  backgroundColor: 'rgba(0, 0, 0, .1)',
  segmentAnimationColor: 'rgba(0, 0, 0, .1)',
  segmentColor: 'linear-gradient(90deg, rgba(244,17,80,1) 0%, rgba(255,50,50,1) 25%, rgba(248,190,7,1) 100%)',
};

describe('<StyledProgress />', () => {
  it('should render a progress bar', () => {
    const { container } = render(<StyledProgress percent={80} {...styles} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
