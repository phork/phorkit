import React from 'react';
import { Triangle } from 'lib';
import { render } from '../../utils';

describe('<Triangle />', () => {
  it('should render a triangle', () => {
    const { container } = render(<Triangle position="bottom" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
