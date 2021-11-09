import React from 'react';
import { ArrowLeftIcon } from 'lib';
import { render } from '../utils';

describe('<ArrowLeftIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<ArrowLeftIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Left arrow')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<ArrowLeftIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
