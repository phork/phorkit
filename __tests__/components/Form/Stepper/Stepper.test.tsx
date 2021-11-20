import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Stepper, NotifiedStepper } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Stepper />', () => {
  it('should render a labeled stepper', () => {
    const { getByText } = render(
      <Stepper label="Super fantastic label" max={10} min={1} onChange={() => {}} step={1} />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
  });

  it('should render a stepper with a value', () => {
    const { container } = render(
      <Stepper id="stepper" label="Super fantastic label" max={10} min={1} onChange={() => {}} step={1} value={5} />,
    );

    const input = document.getElementById('stepper');
    expect(input).toHaveValue(5);
    expect(container.querySelector('input[type=number]')).toBeTruthy();
  });

  it('should progress the focus on tab', () => {
    const { container, getAllByRole } = render(
      <Stepper id="stepper" label="Super fantastic label" max={10} min={1} onChange={() => {}} step={1} value={5} />,
    );

    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(2);

    container.focus();
    userEvent.tab();

    expect(buttons[0]).toHaveFocus();

    userEvent.tab();

    const input = document.getElementById('stepper');
    expect(input).toHaveFocus();

    userEvent.tab();

    expect(buttons[1]).toHaveFocus();
  });

  it('should increment the value from mouse interaction', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(
      <Stepper id="stepper" label="Super fantastic label" max={10} min={1} onChange={onChange} step={1} value={5} />,
    );

    expect(onChange).not.toHaveBeenCalled();

    const buttons = getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(6);
  });

  it('should decrement the value from keyboard interaction', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Stepper id="stepper" label="Super fantastic label" max={10} min={1} onChange={onChange} step={1} value={5} />,
    );

    expect(onChange).not.toHaveBeenCalled();

    container.focus();
    userEvent.tab();
    userEvent.keyboard('[Enter]');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(4);
  });

  it('should trigger the change event', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Stepper label="Super fantastic label" max={10} min={1} onChange={onChange} step={1} />,
    );

    expect(onChange).not.toHaveBeenCalled();

    const stepper = container.querySelector('input');
    stepper && fireEvent.change(stepper, { target: { value: 5 } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(5);
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByTestId } = render(
      <Stepper
        data-testid="stepper"
        label="Super fantastic label"
        max={10}
        min={1}
        onChange={() => {}}
        ref={ref}
        step={1}
      />,
    );

    expect(getByTestId('stepper')).toBe(ref.current);
  });
});

describe('<NotifiedStepper />', () => {
  it('should render a notified stepper', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <NotifiedStepper
        label="Super fantastic label"
        level="danger"
        max={10}
        min={1}
        notification="Example notification"
        onChange={onChange}
        step={1}
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('Example notification')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const stepper = container.querySelector('input');
    stepper && fireEvent.change(stepper, { target: { value: 5 } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(5);
  });
});
