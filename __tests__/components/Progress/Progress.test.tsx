import { render } from '@testing-library/react';
import * as React from 'react';
import { Progress } from 'lib';

describe('<Progress />', () => {
  it('should render a basic progress indicator', () => {
    const { container } = render(<Progress percent={80} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
