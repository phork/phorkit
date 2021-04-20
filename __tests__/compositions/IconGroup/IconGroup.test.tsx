import { render } from '@testing-library/react';
import React from 'react';
import { IconGroup, TimesIcon } from 'lib';

describe('<IconGroup />', () => {
  it('should render a basic icon group', () => {
    const { container } = render(
      <IconGroup scale="large">
        <TimesIcon />
        <TimesIcon />
        <TimesIcon />
        <TimesIcon />
        <TimesIcon />
        <TimesIcon />
      </IconGroup>,
    );
    expect(container.querySelectorAll('svg').length).toBe(6);
  });
});
