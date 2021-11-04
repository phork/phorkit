import React from 'react';
import { LineLoader } from 'lib';
import { render } from '../../utils';

describe('<LineLoader />', () => {
  it('should render a line loader', () => {
    const { container } = render(<LineLoader />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render a 30% complete line loader', () => {
    const { getByTestId } = render(<LineLoader data-testid="lineLoader" percent={30} />);
    const lineLoader = getByTestId('lineLoader');
    expect(lineLoader?.style.getPropertyValue('--line-loader-left')).toBe('0%');
    expect(lineLoader?.style.getPropertyValue('--line-loader-right')).toBe('40%');
  });
});
