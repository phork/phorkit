import React from 'react';
import { ArrowUpDownIcon } from 'lib';
import { render } from '../utils';

describe('<ArrowUpDownIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<ArrowUpDownIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Up and down arrow')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<ArrowUpDownIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
