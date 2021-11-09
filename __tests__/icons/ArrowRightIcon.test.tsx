import React from 'react';
import { ArrowRightIcon } from 'lib';
import { render } from '../utils';

describe('<ArrowRightIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<ArrowRightIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Right arrow')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<ArrowRightIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
