import React from 'react';
import { StyledPassword, NotifiedStyledPassword } from 'lib';
import { fireEvent, render } from '../../../utils';

const styles = {
  passwordIconColor: '#9D69D5',
  passwordIconHoveredColor: '#642da0',
  passwordInputContainerBackgroundColor: 'transparent',
  passwordInputContainerBorderColor: '#9D69D5',
  passwordInputContainerFocusedBorderColor: '#57278C',
  passwordInputContainerHoveredBorderColor: '#642da0',
  passwordInputTextColor: '#642da0',
  passwordLabelTextColor: '#B995E1',
};

describe('<StyledPassword />', () => {
  it('should render a labeled password with the password visible', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <StyledPassword
        initialType="text"
        label="Super fantastic label"
        onChange={onChange}
        value="my password"
        {...styles}
      />,
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
      <StyledPassword
        initialType="password"
        label="Super fantastic label"
        onChange={onChange}
        value="my password"
        {...styles}
      />,
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
      <NotifiedStyledPassword
        label="Super fantastic label"
        level="danger"
        notification="Example notification"
        onChange={onChange}
        {...styles}
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
