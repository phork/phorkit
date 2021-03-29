import { render } from '@testing-library/react';
import { Divider } from 'lib';
import * as React from 'react';

describe('<Divider />', () => {
  it('should render a basic avatar', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
