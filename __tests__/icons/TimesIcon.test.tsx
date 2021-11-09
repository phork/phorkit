import React from 'react';
import { TimesIcon } from 'lib';
import { render } from '../utils';

describe('<TimesIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<TimesIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Close')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<TimesIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
