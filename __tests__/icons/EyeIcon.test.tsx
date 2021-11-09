import React from 'react';
import { EyeIcon } from 'lib';
import { render } from '../utils';

describe('<EyeIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<EyeIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Visible')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<EyeIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
