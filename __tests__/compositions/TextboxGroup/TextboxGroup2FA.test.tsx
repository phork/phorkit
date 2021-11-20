import userEvent from '@testing-library/user-event';
import React from 'react';
import { TextboxGroup2FA } from 'lib';
import { render } from '../../utils';

describe('<TextboxGroup2FA />', () => {
  it('should render a textbox group', () => {
    const { container } = render(<TextboxGroup2FA length={6} onChange={() => {}} value="" />);
    const textboxes = container.querySelectorAll('input');
    expect(textboxes.length).toBe(6);
  });

  it('should trigger the change event', () => {
    const onChange = jest.fn();

    const { container, rerender } = render(<TextboxGroup2FA length={6} onChange={onChange} value="" />);
    const textboxes = container.querySelectorAll('input');

    expect(onChange).not.toHaveBeenCalled();

    userEvent.type(textboxes[0], '4');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('4');

    rerender(<TextboxGroup2FA length={6} onChange={onChange} value="4" />);

    userEvent.type(textboxes[1], '3');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('43');

    rerender(<TextboxGroup2FA length={6} onChange={onChange} value="43" />);

    userEvent.type(textboxes[2], '2');
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('432');
  });

  it('should use a space for a missing input value', () => {
    const onChange = jest.fn();

    const { container } = render(<TextboxGroup2FA length={6} onChange={onChange} value="432" />);
    const textboxes = container.querySelectorAll('input');

    userEvent.type(textboxes[4], '0');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('432 0');
  });
});
