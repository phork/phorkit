import { render } from '@testing-library/react';
import { Loader } from 'lib';
import * as React from 'react';

describe('<Loader />', () => {
  it('should render a basic loader', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
