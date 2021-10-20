import React from 'react';
import { ColoredLineLoader } from 'lib';
import { render } from '../../utils';

describe('<ColoredLineLoader />', () => {
  it('should render a line loader', () => {
    const { container } = render(<ColoredLineLoader colorId="P10" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
