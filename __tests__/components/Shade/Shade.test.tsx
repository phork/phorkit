import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Shade } from 'lib';

describe('<Shade />', () => {
  it('should render a shade', () => {
    const { queryByText } = render(<Shade color="primary">Hello world</Shade>);
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should focus an actionable shade on tab', () => {
    const { container, getByTestId } = render(
      <Shade actionable color="primary" data-testid="shade">
        Super fantastic label
      </Shade>,
    );

    container.focus();
    userEvent.tab();

    expect(getByTestId('shade')).toHaveFocus();
  });

  it('should accept the rest of the props', () => {
    const { getByText } = render(
      <Shade
        actionable
        active
        focused
        hovered
        opaque
        unbordered
        unthemed
        className="shade"
        color="warning"
        themeId="dark"
      >
        Hello world
      </Shade>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Shade color="primary" data-testid="shade" ref={ref}>
        Click me!
      </Shade>,
    );

    expect(getByTestId('shade')).toBe(ref.current);
  });
});
