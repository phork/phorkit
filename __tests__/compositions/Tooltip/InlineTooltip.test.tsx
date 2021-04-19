import { render } from '@testing-library/react';
import * as React from 'react';
import { InlineTooltip, ForwardProps, PopoverContentRenderChildrenProps, TimesIcon } from 'lib';

describe('<InlineTooltip />', () => {
  it('should render a basic tooltip', () => {
    const { getByText } = render(
      <InlineTooltip
        focusable
        height={80}
        permanent
        toggler={<TimesIcon aria-label="TimesIcon" scale="xxxlarge" />}
        triangleColor="#fff"
        width={300}
      >
        <div>Hello world</div>
      </InlineTooltip>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a basic tooltip and forward the position', () => {
    const { getByText } = render(
      <InlineTooltip
        contentProps={{ withChildrenProps: true }}
        focusable
        height={80}
        permanent
        toggler={<TimesIcon aria-label="TimesIcon" scale="xxxlarge" />}
        triangleColor="#fff"
        width={300}
      >
        <ForwardProps<Partial<PopoverContentRenderChildrenProps>>>
          {({ position }) => (
            <React.Fragment>
              <div>Hello world</div>
              <div>{position}</div>
            </React.Fragment>
          )}
        </ForwardProps>
      </InlineTooltip>,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('top-center')).toBeTruthy();
  });
});
