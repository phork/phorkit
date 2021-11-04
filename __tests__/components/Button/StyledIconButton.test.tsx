import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { StyledIconButton, TimesIcon } from 'lib';
import { fireEvent, render } from '../../utils';

const styles = {
  activePrimaryColor: '#798796',
  hoveredPrimaryColor: '#454f58',
  inverseColor: '#fff',
  primaryColor: '#556270',
  width: 100,
};

describe('<StyledIconButton />', () => {
  it('should render a button', () => {
    const { container } = render(
      <StyledIconButton {...styles}>
        <TimesIcon scale="medium" />
      </StyledIconButton>,
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render a disabled button', () => {
    const { getByTestId } = render(
      <StyledIconButton disabled data-testid="button" {...styles}>
        <TimesIcon scale="medium" />
      </StyledIconButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
  });

  it('should render a loading button', () => {
    const { getByText, getByTestId } = render(
      <StyledIconButton loading data-testid="button" loader={<span>Loading</span>} {...styles}>
        <TimesIcon scale="medium" />
      </StyledIconButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
    expect(getByText('Loading')).toBeTruthy();
  });

  it('should render a submit button', () => {
    const { getByTestId } = render(
      <StyledIconButton data-testid="button" type="submit" {...styles}>
        <TimesIcon scale="medium" />
      </StyledIconButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('type', 'submit');
  });

  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <StyledIconButton onClick={onClick} {...styles}>
        <TimesIcon scale="medium" />
      </StyledIconButton>,
    );

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
