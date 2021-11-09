import React from 'react';
import { PencilSlashIcon } from 'lib';
import { render } from '../utils';

describe('<PencilSlashIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<PencilSlashIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Read only')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<PencilSlashIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
