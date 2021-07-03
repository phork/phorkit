import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { TextboxGroup2FA } from 'lib';

describe('<TextboxGroup2FA />', () => {
  it('should render a textbox group', () => {
    const { container } = render(<TextboxGroup2FA length={6} onChange={() => {}} value="" />);
    const textboxes = container.querySelectorAll('input');
    expect(textboxes.length).toBe(6);
  });

  it('should fire the onChange event', () => {
    const onChange = jest.fn();

    const { container, rerender } = render(<TextboxGroup2FA length={6} onChange={onChange} value="" />);
    const textboxes = container.querySelectorAll('input');

    expect(onChange).not.toHaveBeenCalled();

    fireEvent.change(textboxes[0], { target: { value: '4' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('4');

    rerender(<TextboxGroup2FA length={6} onChange={onChange} value="4" />);

    fireEvent.change(textboxes[1], { target: { value: '3' } });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('43');

    rerender(<TextboxGroup2FA length={6} onChange={onChange} value="43" />);

    fireEvent.change(textboxes[2], { target: { value: '2' } });
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('432');
  });
});
