import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { ColoredIconButton, TimesIcon } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { fireEvent, render } from '../../utils';

describe('<ColoredColoredIconButton/>', () => {
  it('should render a button', () => {
    const { container } = render(
      <ColoredIconButton colorId="P10">
        <TimesIcon scale="medium" />
      </ColoredIconButton>,
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render a disabled button', () => {
    const { getByTestId } = render(
      <ColoredIconButton disabled colorId="P10" data-testid="button">
        <TimesIcon scale="medium" />
      </ColoredIconButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
  });

  it('should render a loading button', () => {
    const { getByText, getByTestId } = render(
      <ColoredIconButton loading colorId="P10" data-testid="button" loader={<span>Loading</span>}>
        <TimesIcon scale="medium" />
      </ColoredIconButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
    expect(getByText('Loading')).toBeTruthy();
  });

  it('should render a submit button', () => {
    const { getByTestId } = render(
      <ColoredIconButton colorId="P10" data-testid="button" type="submit">
        <TimesIcon scale="medium" />
      </ColoredIconButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('type', 'submit');
  });

  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ColoredIconButton colorId="P10" onClick={onClick}>
        <TimesIcon scale="medium" />
      </ColoredIconButton>,
    );

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render as a button', () => {
    const { container } = render(
      <ColoredIconButton colorId="P10">
        <TimesIcon scale="medium" />
      </ColoredIconButton>,
    );
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  it('should render as an anchor', () => {
    const { container } = render(
      <ColoredIconButton<'a'> as="a" colorId="P10" href="#button">
        <TimesIcon scale="medium" />
      </ColoredIconButton>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#button');
  });

  it('should render as a div', () => {
    const { container } = render(
      <ColoredIconButton imitation colorId="P10">
        <TimesIcon scale="medium" />
      </ColoredIconButton>,
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render using a functional component', () => {
    const { container } = render(
      <ColoredIconButton<'a'> as={AsTypeA} colorId="P10" href="#button">
        <TimesIcon scale="medium" />
      </ColoredIconButton>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.firstChild).toHaveAttribute('href', '#button');
  });
});
