import React from 'react';
import { Password, NotifiedPassword } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Password />', () => {
  it('should render a labeled password with the password visible', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <Password initialType="text" label="Super fantastic label" onChange={onChange} value="my password" />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(container.querySelector('input[type=text]')).toBeTruthy();
    expect(container.querySelector('input[type=password]')).not.toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const password = container.querySelector('input');
    password && fireEvent.change(password, { target: { value: 'Hello world' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('Hello world');
  });

  it('should render a labeled password with the password hidden', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <Password initialType="password" label="Super fantastic label" onChange={onChange} value="my password" />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(container.querySelector('input[type=text]')).not.toBeTruthy();
    expect(container.querySelector('input[type=password]')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const password = container.querySelector('input');
    password && fireEvent.change(password, { target: { value: 'Hello world' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('Hello world');
  });

  it('should render a notified password', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <NotifiedPassword
        label="Super fantastic label"
        level="danger"
        notification="Example notification"
        onChange={onChange}
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('Example notification')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const password = container.querySelector('input');
    password && fireEvent.change(password, { target: { value: 'Hello world' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('Hello world');
  });
});
