import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Button } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { createEvent, fireEvent, render } from '../../utils';

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

  it('should focus the button on tab', () => {
    const { container, getByRole } = render(<Button id="button">Click me!</Button>);

    container.focus();
    userEvent.tab();

    const button = getByRole('button');
    expect(button).toHaveFocus();
  });

  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click me!</Button>);

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should trigger on Enter keydown when not a button', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Button<'div'> as="div" onClick={onClick}>
        Click me!
      </Button>,
    );

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    button.focus();
    userEvent.keyboard('[Enter]');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not trigger the link when disabled', () => {
    const { getByTestId } = render(
      <Button disabled data-testid="button" href="#">
        Click me!
      </Button>,
    );

    const button = getByTestId('button');
    const keyDownEvent = createEvent.keyDown(button, { key: 'Enter' });
    fireEvent(button, keyDownEvent);

    expect(keyDownEvent.defaultPrevented).toBe(true);
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

  it('should render an unstyled button', () => {
    const { getByText } = render(<Button unstyled>Hello world</Button>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <Button
        active
        focused
        fullWidth
        hovered
        noHeight
        noPadding
        unthemed
        align="left"
        className="button"
        color="primary"
        id="button"
        shape="brick"
        size="small"
        style={{ color: 'red' }}
        themeId="dark"
        weight="solid"
      >
        Hello world
      </Button>,
    );

    const button = document.getElementById('button');
    expect(button?.nodeName).toBe('BUTTON');
    expect(button?.style.getPropertyValue('color')).toBe('red');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { getByTestId } = render(
      <Button data-testid="button" ref={ref}>
        Click me!
      </Button>,
    );

    expect(getByTestId('button')).toBe(ref.current);
  });
});
