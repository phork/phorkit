import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Button } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { fireEvent, render } from '../../utils';

describe('<Button />', () => {
  it('should render a button', () => {
    const { getByText } = render(<Button>Click me!</Button>);
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render a disabled button', () => {
    const { getByTestId } = render(
      <Button disabled data-testid="button">
        Click me!
      </Button>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
  });

  it('should render a loading button', () => {
    const { getByText, getByTestId } = render(
      <Button loading data-testid="button" loader={<span>Loading</span>}>
        Click me!
      </Button>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
    expect(getByText('Loading')).toBeTruthy();
  });

  it('should render a submit button', () => {
    const { getByTestId } = render(
      <Button data-testid="button" type="submit">
        Click me!
      </Button>,
    );
    expect(getByTestId('button')).toHaveAttribute('type', 'submit');
  });

  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click me!</Button>);

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render as a button', () => {
    const { container } = render(<Button>Click me!</Button>);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  it('should render as an anchor', () => {
    const { container } = render(
      <Button<'a'> as="a" href="#button">
        Click me!
      </Button>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#button');
  });

  it('should render as a div', () => {
    const { container } = render(<Button imitation>Click me!</Button>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(
      <Button<'a'> as={AsTypeA} href="#button">
        Click me!
      </Button>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#button');
    expect(getByText('Click me!')).toBeTruthy();
  });
});
