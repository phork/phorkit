import React from 'react';
import { IconToast, TimesIcon } from 'lib';
import { render } from '../../utils';

describe('<IconToast />', () => {
  it('should render a toast with an icon', () => {
    const { container, getByText } = render(
      <IconToast immediate icon={TimesIcon} level="success">
        This is a success toast.
      </IconToast>,
    );
    expect(getByText('This is a success toast.')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render a toast with a title', () => {
    const { getByText } = render(
      <IconToast immediate icon={TimesIcon} level="success" title="Hello world">
        This is a success toast.
      </IconToast>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });
});
