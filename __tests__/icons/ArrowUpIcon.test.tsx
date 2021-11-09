import React from 'react';
import { ArrowUpIcon } from 'lib';
import { render } from '../utils';

describe('<ArrowUpIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<ArrowUpIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Up arrow')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<ArrowUpIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
