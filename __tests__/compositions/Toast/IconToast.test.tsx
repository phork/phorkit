import React from 'react';
import { IconToast, TimesIcon } from 'lib';
import { render } from '../../utils';

describe('<IconToast />', () => {
  it('should render a basic toast with a title', () => {
    const { container, getByText } = render(
      <IconToast immediate icon={TimesIcon} level="success" title="Hello world">
        This is a success toast.
      </IconToast>,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('This is a success toast.')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
