import React from 'react';
import { InlineTooltip, TimesIcon } from 'lib';
import { render } from '../../utils';

describe('<InlineTooltip />', () => {
  it('should render a tooltip', () => {
    const { getByText } = render(
      <InlineTooltip
        permanent
        height={80}
        position="top-center"
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

  it('should render a popover and generate a position', () => {
    const { getByText } = render(
      <InlineTooltip
        permanent
        height={80}
        layout="vertical"
        renderChildren={({ position }) => <div>{position}</div>}
        toggler={<TimesIcon scale="3xlarge" />}
        triangleColor="#fff"
        width={300}
      />,
    );
    expect(getByText('bottom-right')).toBeTruthy();
  });

  it('should error without children', () => {
    const consoleWarnMock = jest.spyOn(console, 'error').mockImplementation();

    expect(() =>
      render(
        <InlineTooltip permanent height={80} toggler={<TimesIcon scale="3xlarge" />} triangleColor="red" width={300} />,
      ),
    ).toThrow();

    consoleWarnMock.mockRestore();
  });
});
