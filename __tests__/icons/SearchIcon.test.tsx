import React from 'react';
import { SearchIcon } from 'lib';
import { render } from '../utils';

describe('<SearchIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<SearchIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Search')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<SearchIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
