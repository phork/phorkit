import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Slider, NotifiedSlider } from 'lib';

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

  it('should render a notified slider', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <NotifiedSlider
        min={0}
        max={10}
        value={4}
        width="100%"
        valuePosition="right"
        onChange={onChange}
        level="danger"
        notification="Example notification"
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
