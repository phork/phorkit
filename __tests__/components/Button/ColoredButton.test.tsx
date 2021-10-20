import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { ColoredButton } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { fireEvent, render } from '../../utils';

describe('<ColoredButton colorId="P10" />', () => {
  it('should render a button', () => {
    const { getByText } = render(<ColoredButton colorId="P10">Click me!</ColoredButton>);
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render a disabled button', () => {
    const { getByTestId } = render(
      <ColoredButton disabled colorId="P10" data-testid="button">
        Click me!
      </ColoredButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
  });

  it('should render a loading button', () => {
    const { getByText, getByTestId } = render(
      <ColoredButton loading colorId="P10" data-testid="button" loader={<span>Loading</span>}>
        Click me!
      </ColoredButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
    expect(getByText('Loading')).toBeTruthy();
  });

  it('should render a submit button', () => {
    const { getByTestId } = render(
      <ColoredButton colorId="P10" data-testid="button" type="submit">
        Click me!
      </ColoredButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('type', 'submit');
  });

  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ColoredButton colorId="P10" onClick={onClick}>
        Click me!
      </ColoredButton>,
    );

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render as a button', () => {
    const { container } = render(<ColoredButton colorId="P10">Click me!</ColoredButton>);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  it('should render as an anchor', () => {
    const { container } = render(
      <ColoredButton<'a'> as="a" colorId="P10" href="#button">
        Click me!
      </ColoredButton>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#button');
  });

  it('should render as a div', () => {
    const { container } = render(
      <ColoredButton imitation colorId="P10">
        Click me!
      </ColoredButton>,
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(
      <ColoredButton<'a'> as={AsTypeA} colorId="P10" href="#button">
        Click me!
      </ColoredButton>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#button');
    expect(getByText('Click me!')).toBeTruthy();
  });
});
