import React from 'react';
import { ColoredBadge } from 'lib';
import { render } from '../../utils';

describe('<ColoredBadge />', () => {
  it('should render a marker badge', () => {
    const { container } = render(<ColoredBadge colorId="P10" shape="marker" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render a point badge', () => {
    const { container } = render(<ColoredBadge colorId="P10" shape="point" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render a count badge', () => {
    const { getByText } = render(
      <ColoredBadge colorId="P10" shape="count">
        213
      </ColoredBadge>,
    );
    expect(getByText('213')).toBeTruthy();
  });

  it('should render a label badge', () => {
    const { getByText } = render(
      <ColoredBadge colorId="P10" shape="label">
        Beta
      </ColoredBadge>,
    );
    expect(getByText('Beta')).toBeTruthy();
  });
});
