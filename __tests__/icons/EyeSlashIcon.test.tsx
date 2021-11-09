import React from 'react';
import { EyeSlashIcon } from 'lib';
import { render } from '../utils';

describe('<EyeSlashIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<EyeSlashIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Hidden')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<EyeSlashIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
