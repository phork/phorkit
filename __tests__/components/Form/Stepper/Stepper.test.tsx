import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Stepper, NotifiedStepper } from 'lib';

describe('<Stepper />', () => {
  it('should render a labeled stepper', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <Stepper label="Super fantastic label" max={10} min={1} onChange={onChange} step={1} />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const stepper = container.querySelector('input');
    stepper && fireEvent.change(stepper, { target: { value: 5 } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(5);
  });

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
