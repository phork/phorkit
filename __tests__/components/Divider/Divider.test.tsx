import React from 'react';
import { Divider } from 'lib';
import { render } from '../../utils';

describe('<Divider />', () => {
  it('should render a divider', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
