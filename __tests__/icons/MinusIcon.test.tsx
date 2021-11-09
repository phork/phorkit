import React from 'react';
import { MinusIcon } from 'lib';
import { render } from '../utils';

describe('<MinusIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<MinusIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Minus')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<MinusIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
