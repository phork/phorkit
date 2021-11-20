import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Password, NotifiedPassword } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Password />', () => {
  it('should render a labeled password with the password visible', () => {
    const { container, getByText } = render(
      <Password initialType="text" label="Super fantastic label" onChange={() => {}} value="my password" />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(container.querySelector('input[type=text]')).toBeTruthy();
    expect(container.querySelector('input[type=password]')).not.toBeTruthy();
  });

  it('should render a labeled password with the password hidden', () => {
    const { container, getByText } = render(
      <Password initialType="password" label="Super fantastic label" onChange={() => {}} value="my password" />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(container.querySelector('input[type=text]')).not.toBeTruthy();
    expect(container.querySelector('input[type=password]')).toBeTruthy();
  });

  it('should focus the input on tab', () => {
    const { container } = render(
      <Password id="password" initialType="text" label="Super fantastic label" onChange={() => {}} />,
    );

    container.focus();
    userEvent.tab();

    const input = document.getElementById('password');
    expect(input).toHaveFocus();
  });

  it('should focus the view toggle on second tab', () => {
    const { container, getByRole } = render(
      <Password initialType="text" label="Super fantastic label" onChange={() => {}} />,
    );

    container.focus();
    userEvent.tab();
    userEvent.tab();

    const button = getByRole('button');
    expect(button).toHaveFocus();
  });

  it('should toggle the view type', () => {
    const { container } = render(<Password initialType="password" label="Super fantastic label" onChange={() => {}} />);

    expect(container.querySelector('input[type=password]')).toBeTruthy();

    container.focus();
    userEvent.tab();
    userEvent.tab();
    userEvent.keyboard('[Enter]');

    expect(container.querySelector('input[type=password]')).not.toBeTruthy();
  });

  it('should trigger the change event', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Password initialType="text" label="Super fantastic label" onChange={onChange} value="my password" />,
    );

    expect(onChange).not.toHaveBeenCalled();

    const password = container.querySelector('input');
    password && fireEvent.change(password, { target: { value: 'Hello world' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('Hello world');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByTestId } = render(
      <Password
        data-testid="password"
        initialType="text"
        label="Super fantastic label"
        onChange={() => {}}
        ref={ref}
        value="my password"
      />,
    );

    expect(getByTestId('password')).toBe(ref.current);
  });
});

describe('<NotifiedPassword />', () => {
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
