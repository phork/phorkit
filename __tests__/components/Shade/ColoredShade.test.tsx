import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ColoredShade } from 'lib';

describe('<ColoredShade />', () => {
  it('should render a shade', () => {
    const { queryByText } = render(<ColoredShade colorId="P10">Hello world</ColoredShade>);
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should focus an actionable shade on tab', () => {
    const { container, getByTestId } = render(
      <ColoredShade actionable colorId="P10" data-testid="shade">
        Super fantastic label
      </ColoredShade>,
    );

    container.focus();
    userEvent.tab();

    expect(getByTestId('shade')).toHaveFocus();
  });
});
