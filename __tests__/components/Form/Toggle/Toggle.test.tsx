import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Toggle, NotifiedToggle } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Toggle />', () => {
  it('should render a labeled toggle', () => {
    const { getByText } = render(<Toggle onChange={() => {}}>Super fantastic label</Toggle>);
    expect(getByText('Super fantastic label')).toBeTruthy();
  });

  it('should trigger the change event', () => {
    const onChange = jest.fn();
    const { container } = render(<Toggle onChange={onChange}>Super fantastic label</Toggle>);

    expect(onChange).not.toHaveBeenCalled();

    const toggle = container.querySelector('input');
    toggle && fireEvent.click(toggle);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(true);
  });

  it('should focus the input on tab', () => {
    const { container } = render(
      <Toggle id="toggle" onChange={() => {}}>
        Super fantastic label
      </Toggle>,
    );

    container.focus();
    userEvent.tab();

    const input = document.getElementById('toggle');
    expect(input).toHaveFocus();
  });

  it('should toggle to checked on click', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Toggle data-testid="toggle" onChange={onChange}>
        Super fantastic label
      </Toggle>,
    );

    expect(onChange).not.toHaveBeenCalled();

    const toggle = getByTestId('toggle');
    toggle && fireEvent.click(toggle);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(true);
  });

  it('should toggle to unchecked on click', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Toggle checked data-testid="toggle" onChange={onChange}>
        Super fantastic label
      </Toggle>,
    );

    expect(onChange).not.toHaveBeenCalled();

    const toggle = getByTestId('toggle');
    toggle && fireEvent.click(toggle);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(false);
  });

  it('should toggle to checked on space', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Toggle id="toggle" onChange={onChange}>
        Super fantastic label
      </Toggle>,
    );

    expect(onChange).not.toHaveBeenCalled();

    container.focus();
    userEvent.tab();

    const input = document.getElementById('toggle');
    if (input) {
      input.focus();
      userEvent.keyboard('[Space]');
    }

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(true);
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { container } = render(
      <Toggle onChange={() => {}} ref={ref}>
        Super fantastic label
      </Toggle>,
    );

    expect(container.querySelector('input')).toBe(ref.current);
  });
});

describe('<NotifiedToggle />', () => {
  it('should render a notified toggle', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <NotifiedToggle level="danger" notification="Example notification" onChange={onChange}>
        Super fantastic label
      </NotifiedToggle>,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('Example notification')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const toggle = container.querySelector('input');
    toggle && fireEvent.click(toggle);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(true);
  });
});
