import React from 'react';
import { PinIcon } from 'lib';
import { render } from '../utils';

describe('<PinIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<PinIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Pin')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<PinIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
