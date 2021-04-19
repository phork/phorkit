import { render } from '@testing-library/react';
import * as React from 'react';
import { Badge } from 'lib';

describe('<Badge />', () => {
  it('should render a basic badge', () => {
    const { container } = render(<Badge />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render a basic badge with children', () => {
    const { getByText } = render(<Badge>213</Badge>);
    expect(getByText('213')).toBeTruthy();
  });
});
