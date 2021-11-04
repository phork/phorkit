import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { StyledButton } from 'lib';
import { fireEvent, render } from '../../utils';

const styles = {
  activePrimaryColor: '#798796',
  hoveredPrimaryColor: '#454f58',
  inverseColor: '#fff',
  primaryColor: '#556270',
  width: 120,
};

describe('<StyledButton />', () => {
  it('should render a button', () => {
    const { getByText } = render(<StyledButton {...styles}>Click me!</StyledButton>);
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render a disabled button', () => {
    const { getByTestId } = render(
      <StyledButton disabled data-testid="button" {...styles}>
        Click me!
      </StyledButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
  });

  it('should render a loading button', () => {
    const { getByText, getByTestId } = render(
      <StyledButton loading data-testid="button" loader={<span>Loading</span>} {...styles}>
        Click me!
      </StyledButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
    expect(getByText('Loading')).toBeTruthy();
  });

  it('should render a submit button', () => {
    const { getByTestId } = render(
      <StyledButton data-testid="button" type="submit" {...styles}>
        Click me!
      </StyledButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('type', 'submit');
  });

  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <StyledButton onClick={onClick} {...styles}>
        Click me!
      </StyledButton>,
    );

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render as a button', () => {
    const { container } = render(<StyledButton {...styles}>Click me!</StyledButton>);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });
});
