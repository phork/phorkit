import React from 'react';
import { LineLoader } from 'lib';
import { render } from '../../utils';

describe('<LineLoader />', () => {
  it('should render a basic line loader', () => {
    const { container } = render(<LineLoader />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
