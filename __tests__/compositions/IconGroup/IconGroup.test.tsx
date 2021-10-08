import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { IconGroup, TimesIcon } from 'lib';

describe('<IconGroup />', () => {
  it('should render a basic icon group by scale', () => {
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
    expect(container.querySelector('svg')).toHaveAttribute('width', '20px');
  });

  it('should render a basic icon group by size', () => {
    const { container } = render(
      <IconGroup size={12}>
        <TimesIcon />
        <TimesIcon />
        <TimesIcon />
        <TimesIcon />
        <TimesIcon />
        <TimesIcon />
      </IconGroup>,
    );
    expect(container.querySelectorAll('svg').length).toBe(6);
    expect(container.querySelector('svg')).toHaveAttribute('width', '12px');
  });
});
