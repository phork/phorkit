import React from 'react';
import { Slider, NotifiedSlider } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Slider />', () => {
  it('should render a labeled slider', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <Slider max={10} min={0} onChange={onChange} value={4} valuePosition="right" width="100%">
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

  it('should render a notified slider', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <NotifiedSlider
        level="danger"
        max={10}
        min={0}
        notification="Example notification"
        onChange={onChange}
        value={4}
        valuePosition="right"
        width="100%"
      >
        Super fantastic label
      </NotifiedSlider>,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('Example notification')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const slider = container.querySelector('input');
    slider && fireEvent.change(slider, { target: { value: 5 } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(5);
  });
});
