import { fireEvent, render } from '@testing-library/react';
import { Slider } from 'lib';
import * as React from 'react';

describe('<Slider />', () => {
  it('should render a labeled slider', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <Slider min={0} max={10} value={4} width="100%" valuePosition="right" onChange={onChange}>
        Super fantastic label
      </Slider>,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const slider = container.querySelector('input');
    slider && fireEvent.change(slider, { target: { value: 5 } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(5);
  });
});
