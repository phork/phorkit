import React from 'react';
import { PhorkitIcon } from 'lib';
import { render } from '../utils';

describe('<PhorkitIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<PhorkitIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Phork/it')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<PhorkitIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
