import { fireEvent, render } from '@testing-library/react';
import { Stepper } from 'lib';
import * as React from 'react';

describe('<Stepper />', () => {
  it('should render a labeled stepper', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <Stepper label="Super fantastic label" min={1} max={10} step={1} onChange={onChange} />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const stepper = container.querySelector('input');
    stepper && fireEvent.change(stepper, { target: { value: 5 } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(5);
  });
});
