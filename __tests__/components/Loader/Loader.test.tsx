import { render } from '@testing-library/react';
import React from 'react';
import { Loader } from 'lib';

describe('<Loader />', () => {
  it('should render a basic loader', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
