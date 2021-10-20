import React from 'react';
import { InlineTooltip, TimesIcon } from 'lib';
import { render } from '../../utils';

describe('<InlineTooltip />', () => {
  it('should render a tooltip', () => {
    const { getByText } = render(
      <InlineTooltip
        focusable
        permanent
        height={80}
        toggler={<TimesIcon scale="3xlarge" />}
        triangleColor="#fff"
        width={300}
      >
        <div>Hello world</div>
      </InlineTooltip>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a tooltip and forward the position', () => {
    const { getByText } = render(
      <InlineTooltip
        focusable
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
