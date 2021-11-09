import React from 'react';
import { SpinnerIcon } from 'lib';
import { render } from '../utils';

describe('<SpinnerIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<SpinnerIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Spinner')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<SpinnerIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
