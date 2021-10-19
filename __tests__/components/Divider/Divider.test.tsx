import React from 'react';
import { Divider } from 'lib';
import { render } from '../../utils';

describe('<Divider />', () => {
  it('should render a basic avatar', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
