import React from 'react';
import { ArrowDoubleLeftIcon } from 'lib';
import { render } from '../utils';

describe('<ArrowDoubleLeftIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<ArrowDoubleLeftIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Double left arrow')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<ArrowDoubleLeftIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
