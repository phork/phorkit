import { render } from '@testing-library/react';
import { IconGroup, TimesIcon } from 'lib';
import * as React from 'react';

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
