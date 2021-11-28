import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Paper } from 'lib';
import { render } from '../../utils';

describe('<Paper />', () => {
  it('should render a paper', () => {
    const { getByText } = render(<Paper>Hello world</Paper>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a paper with multiple children', () => {
    const { getAllByText } = render(
      <Paper>
        <div>Hello world</div>
        <div>Hello world</div>
      </Paper>,
    );
    expect(getAllByText('Hello world').length).toBe(2);
  });

  it('should focus scrollable paper on tab', () => {
    const { container, getByTestId } = render(
      <Paper scrollable data-testid="paper">
        Super fantastic label
      </Paper>,
    );

    container.focus();
    userEvent.tab();

    expect(getByTestId('paper')).toHaveFocus();
  });

  it('should accept the rest of the props', () => {
    const { getByText } = render(
      <Paper
        bordered
        contained
        flexible
        full
        scrollable
        unthemed
        className="paper"
        color="warning"
        container="panel"
        scrollbar="small"
        themeId="dark"
      >
        Hello world
      </Paper>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Paper data-testid="paper" ref={ref}>
        Click me!
      </Paper>,
    );

    expect(getByTestId('paper')).toBe(ref.current);
  });
});
