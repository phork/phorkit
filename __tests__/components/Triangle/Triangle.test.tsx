import { render } from '@testing-library/react';
import * as React from 'react';
import { Triangle } from 'lib';

describe('<Triangle />', () => {
  it('should render a basic triangle', () => {
    const { container } = render(<Triangle position="bottom" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
