import { render } from '@testing-library/react';
import React from 'react';
import { Badge } from 'lib';

describe('<Badge />', () => {
  it('should render a basic badge', () => {
    const { container } = render(<Badge shape="marker" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render a basic badge with children', () => {
    const { getByText } = render(<Badge shape="count">213</Badge>);
    expect(getByText('213')).toBeTruthy();
  });
});
