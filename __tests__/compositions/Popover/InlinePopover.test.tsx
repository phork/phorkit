import React from 'react';
import { InlinePopover, TimesIcon } from 'lib';
import { render } from '../../utils';

describe('<InlinePopover />', () => {
  it('should render a basic popover', () => {
    const { getByText } = render(
      <InlinePopover focusable permanent height={80} toggler={<TimesIcon scale="3xlarge" />} width={300}>
        <div>Hello world</div>
      </InlinePopover>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a basic popover and forward the position', () => {
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
});
