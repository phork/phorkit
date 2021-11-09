import React from 'react';
import { PlusIcon } from 'lib';
import { render } from '../utils';

describe('<PlusIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<PlusIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Plus')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<PlusIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
