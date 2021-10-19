import React from 'react';
import { Progress } from 'lib';
import { render } from '../../utils';

describe('<Progress />', () => {
  it('should render a basic progress indicator', () => {
    const { container } = render(<Progress percent={80} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
