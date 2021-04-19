import { render } from '@testing-library/react';
import * as React from 'react';
import { Divider } from 'lib';

describe('<Divider />', () => {
  it('should render a basic avatar', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
