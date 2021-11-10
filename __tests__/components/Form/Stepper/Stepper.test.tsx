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

  it('should fire a change event', () => {
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
