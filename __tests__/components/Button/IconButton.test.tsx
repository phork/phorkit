import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { IconButton, TimesIcon } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { createEvent, fireEvent, render } from '../../utils';

describe('<IconButton />', () => {
  it('should render a button', () => {
    const { container } = render(
      <IconButton>
        <TimesIcon scale="medium" />
      </IconButton>,
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render a disabled button', () => {
    const { getByTestId } = render(
      <IconButton disabled data-testid="button">
        <TimesIcon scale="medium" />
      </IconButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
  });

  it('should render a loading button', () => {
    const { getByText, getByTestId } = render(
      <IconButton loading data-testid="button" loader={<span>Loading</span>}>
        <TimesIcon scale="medium" />
      </IconButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('disabled');
    expect(getByText('Loading')).toBeTruthy();
  });

  it('should render a submit button', () => {
    const { getByTestId } = render(
      <IconButton data-testid="button" type="submit">
        <TimesIcon scale="medium" />
      </IconButton>,
    );
    expect(getByTestId('button')).toHaveAttribute('type', 'submit');
  });

  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <IconButton onClick={onClick}>
        <TimesIcon scale="medium" />
      </IconButton>,
    );

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should trigger on Enter keydown when not a button', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <IconButton<'div'> as="div" onClick={onClick}>
        <TimesIcon scale="medium" />
      </IconButton>,
    );

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    button.focus();
    userEvent.keyboard('[Enter]');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not trigger the link when disabled', () => {
    const { getByTestId } = render(
      <IconButton disabled data-testid="button" href="#">
        <TimesIcon scale="medium" />
      </IconButton>,
    );

    const button = getByTestId('button');
    const keyDownEvent = createEvent.keyDown(button, { key: 'Enter' });
    fireEvent(button, keyDownEvent);

    expect(keyDownEvent.defaultPrevented).toBe(true);
  });

  it('should render as a button', () => {
    const { container } = render(
      <IconButton>
        <TimesIcon scale="medium" />
      </IconButton>,
    );
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  it('should render as an anchor', () => {
    const { container } = render(
      <IconButton<'a'> as="a" href="#button">
        <TimesIcon scale="medium" />
      </IconButton>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#button');
  });

  it('should render as a div', () => {
    const { container } = render(
      <IconButton imitation>
        <TimesIcon scale="medium" />
      </IconButton>,
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render using a functional component', () => {
    const { container } = render(
      <IconButton<'a'> as={AsTypeA} href="#button">
        <TimesIcon scale="medium" />
      </IconButton>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.firstChild).toHaveAttribute('href', '#button');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { getByTestId } = render(
      <IconButton data-testid="button" ref={ref}>
        <TimesIcon scale="medium" />
      </IconButton>,
    );

    expect(getByTestId('button')).toBe(ref.current);
  });
});
