import React from 'react';
import { StyledLineLoader } from 'lib';
import { render } from '../../utils';

const styles = {
  color: '#556270',
};

describe('<StyledLineLoader />', () => {
  it('should render a line loader', () => {
    const { container } = render(<StyledLineLoader {...styles} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render a 30% complete line loader', () => {
    const { getByTestId } = render(<StyledLineLoader data-testid="lineLoader" percent={30} {...styles} />);
    const lineLoader = getByTestId('lineLoader');
    expect(lineLoader?.style.getPropertyValue('--line-loader-left')).toBe('0%');
    expect(lineLoader?.style.getPropertyValue('--line-loader-right')).toBe('40%');
  });
});
