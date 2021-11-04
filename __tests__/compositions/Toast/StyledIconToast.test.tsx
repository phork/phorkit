import React from 'react';
import { StyledIconToast, TimesIcon } from 'lib';
import { render } from '../../utils';

const styles = {
  levelColor: '#556270',
  levelInverseColor: '#fff',
};

describe('<StyledIconToast />', () => {
  it('should render a toast with an icon', () => {
    const { container, getByText } = render(
      <StyledIconToast immediate icon={TimesIcon} {...styles}>
        This is a styled toast.
      </StyledIconToast>,
    );
    expect(getByText('This is a styled toast.')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render a toast with a title', () => {
    const { getByText } = render(
      <StyledIconToast immediate icon={TimesIcon} title="Hello world" {...styles}>
        This is a styled toast.
      </StyledIconToast>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });
});
