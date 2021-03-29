import { render } from '@testing-library/react';
import { Triangle } from 'lib';
import * as React from 'react';

describe('<Triangle />', () => {
  it('should render a basic triangle', () => {
    const { container } = render(<Triangle position="bottom" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
