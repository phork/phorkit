import React from 'react';
import { EllipsisIcon } from 'lib';
import { render } from '../utils';

describe('<EllipsisIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<EllipsisIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Ellipsis')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<EllipsisIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
