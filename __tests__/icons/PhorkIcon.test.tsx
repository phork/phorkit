import React from 'react';
import { PhorkIcon } from 'lib';
import { render } from '../utils';

describe('<PhorkIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<PhorkIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Phork')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<PhorkIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
