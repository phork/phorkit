import React from 'react';
import { PortalTooltip, TimesIcon } from 'lib';
import { render } from '../../utils';

describe('<PortalTooltip />', () => {
  it('should render a tooltip', () => {
    const { getByText } = render(
      <PortalTooltip permanent height={80} toggler={<TimesIcon scale="3xlarge" />} triangleColor="#fff" width={300}>
        <div>Hello world</div>
      </PortalTooltip>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a tooltip and forward the position', () => {
    const { getByText } = render(
      <PortalTooltip
        permanent
        height={80}
        position="bottom-right"
        renderChildren={({ position }) => (
          <React.Fragment>
            <div>Hello world</div>
            <div>{position}</div>
          </React.Fragment>
        )}
        toggler={<TimesIcon scale="3xlarge" />}
        triangleColor="#fff"
        width={300}
      />,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('bottom-right')).toBeTruthy();
  });
});
