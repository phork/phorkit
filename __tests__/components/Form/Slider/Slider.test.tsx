import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Slider, NotifiedSlider } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Slider />', () => {
  it('should render a labeled slider', () => {
    const { getByText } = render(
      <Slider max={10} min={0} onChange={() => {}} value={4} valuePosition="right" width="100%">
        Super fantastic label
      </Slider>,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
  });

  it('should focus the input on tab', () => {
    const { container, getByTestId } = render(
      <Slider data-testid="slider" max={10} min={0} onChange={() => {}} value={4} valuePosition="right" width="100%">
        Super fantastic label
      </Slider>,
    );

    container.focus();
    userEvent.tab();

    const input = getByTestId('slider');
    expect(input).toHaveFocus();
  });

  it('should trigger the change event', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Slider max={10} min={0} onChange={onChange} value={4} valuePosition="right" width="100%">
        Super fantastic label
      </Slider>,
    );

    expect(onChange).not.toHaveBeenCalled();

    const slider = container.querySelector('input');
    slider && fireEvent.change(slider, { target: { value: 5 } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(5);
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByTestId } = render(
      <Slider
        data-testid="slider"
        max={10}
        min={0}
        onChange={() => {}}
        ref={ref}
        value={4}
        valuePosition="right"
        width="100%"
      >
        Super fantastic label
      </Slider>,
    );

    expect(getByTestId('slider')).toBe(ref.current);
  });
});

describe('<NotifiedSlider />', () => {
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
