import React from 'react';
import { ArrowDownIcon } from 'lib';
import { render } from '../utils';

describe('<ArrowDownIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<ArrowDownIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Down arrow')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<ArrowDownIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
