import React from 'react';
import { ArrowDoubleRightIcon } from 'lib';
import { render } from '../utils';

describe('<ArrowDoubleRightIcon />', () => {
  it('should render the icon', () => {
    const { container, getByTitle } = render(<ArrowDoubleRightIcon />);
    expect(container.firstChild?.nodeName).toBe('svg');
    expect(getByTitle('Double right arrow')).toBeTruthy();
  });

  it('should render with a custom title', () => {
    const { getByTitle } = render(<ArrowDoubleRightIcon title="Test title" />);
    expect(getByTitle('Test title')).toBeTruthy();
  });
});
