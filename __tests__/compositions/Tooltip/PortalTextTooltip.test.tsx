import React from 'react';
import { PortalTextTooltip, TimesIcon } from 'lib';
import { render } from '../../utils';

describe('<PortalTextTooltip />', () => {
  it('should render a tooltip', () => {
    const { getByText } = render(
      <PortalTextTooltip
        permanent
        height={80}
        position="top-center"
        toggler={<TimesIcon scale="3xlarge" />}
        width={300}
      >
        Hello world
      </PortalTextTooltip>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should error without children', () => {
    const consoleWarnMock = jest.spyOn(console, 'error').mockImplementation();

    expect(() =>
      render(<PortalTextTooltip permanent height={80} toggler={<TimesIcon scale="3xlarge" />} width={300} />),
    ).toThrow();

    consoleWarnMock.mockRestore();
  });
});
