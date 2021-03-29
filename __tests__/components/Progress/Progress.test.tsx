import { render } from '@testing-library/react';
import { Progress } from 'lib';
import * as React from 'react';

describe('<Progress />', () => {
  it('should render a basic progress indicator', () => {
    const { container } = render(<Progress percent={80} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
