import React from 'react';
import { InlinePopover, TimesIcon } from 'lib';
import { render } from '../../utils';

describe('<InlinePopover />', () => {
  it('should render a popover', () => {
    const { getByText } = render(
      <InlinePopover permanent height={80} position="top-center" toggler={<TimesIcon scale="3xlarge" />} width={300}>
        <div>Hello world</div>
      </InlinePopover>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a popover and forward the position', () => {
    const { getByText } = render(
      <InlinePopover
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
        width={300}
      />,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('bottom-right')).toBeTruthy();
  });

  it('should render a popover and generate a position', () => {
    const { getByText } = render(
      <InlinePopover
        permanent
        height={80}
        layout="vertical"
        renderChildren={({ position }) => <div>{position}</div>}
        toggler={<TimesIcon scale="3xlarge" />}
        width={300}
      />,
    );
    expect(getByText('bottom-right')).toBeTruthy();
  });
});
