import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { StyledShade } from 'lib';

const styles = {
  activePrimaryColor: '#367c76',
  inverseColor: '#fff',
  opaquePrimaryColor: '#F1F7F6',
  primaryColor: '#3e8e87',
};

describe('<StyledShade />', () => {
  it('should render a shade', () => {
    const { queryByText } = render(<StyledShade {...styles}>Hello world</StyledShade>);
    expect(queryByText('Hello world')).toBeTruthy();
  });

  it('should focus an actionable shade on tab', () => {
    const { container, getByTestId } = render(
      <StyledShade actionable data-testid="shade" {...styles}>
        Super fantastic label
      </StyledShade>,
    );

    container.focus();
    userEvent.tab();

    expect(getByTestId('shade')).toHaveFocus();
  });
});
