import React from 'react';
import { PortalTextTooltip, TimesIcon } from 'lib';
import { render } from '../../utils';

describe('<PortalTextTooltip />', () => {
  it('should render a tooltip', () => {
    const { getByText } = render(
      <PortalTextTooltip permanent height={80} toggler={<TimesIcon scale="3xlarge" />} width={300}>
        Hello world
      </PortalTextTooltip>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });
});
