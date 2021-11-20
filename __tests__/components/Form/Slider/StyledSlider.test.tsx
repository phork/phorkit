import React from 'react';
import { StyledSlider, NotifiedStyledSlider } from 'lib';
import { fireEvent, render } from '../../../utils';

const styles = {
  handleBackgroundColor: '#283992',
  tickBackgroundColor: '#e4e4e4',
  trackBackgroundColor: '#e4e4e4',
  trackFillBackgroundColor: '#642da0',
};

describe('<StyledSlider />', () => {
  it('should render a labeled slider', () => {
    const onChange = jest.fn();

    const { getByText } = render(
      <StyledSlider max={10} min={0} onChange={onChange} value={4} valuePosition="right" width="100%" {...styles}>
        Super fantastic label
      </StyledSlider>,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
  });

  it('should trigger the change event', () => {
    const onChange = jest.fn();
    const { container } = render(
      <StyledSlider max={10} min={0} onChange={onChange} value={4} valuePosition="right" width="100%" {...styles}>
        Super fantastic label
      </StyledSlider>,
    );

    expect(onChange).not.toHaveBeenCalled();

    const slider = container.querySelector('input');
    slider && fireEvent.change(slider, { target: { value: 5 } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(5);
  });
});

describe('<NotifiedStyledSlider />', () => {
  it('should render a notified slider', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <NotifiedStyledSlider
        level="danger"
        max={10}
        min={0}
        notification="Example notification"
        onChange={onChange}
        value={4}
        valuePosition="right"
        width="100%"
        {...styles}
      >
        Super fantastic label
      </NotifiedStyledSlider>,
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
