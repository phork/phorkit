import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Textbox, NotifiedTextbox } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Textbox />', () => {
  it('should render a labeled textbox', () => {
    const { getByText } = render(<Textbox label="Super fantastic label" onChange={() => {}} />);
    expect(getByText('Super fantastic label')).toBeTruthy();
  });

  it('should render a textbox with a value', () => {
    const { container } = render(<Textbox id="textbox" onChange={() => {}} value="Hello world" />);

    const input = document.getElementById('textbox');
    expect(input).toHaveValue('Hello world');
    expect(container.querySelector('input[type=text]')).toBeTruthy();
  });

  it('should render a read only textbox with a value', () => {
    const { container, getByText } = render(
      <Textbox readOnly label="Super fantastic label" onChange={() => {}} value="Hello world" />,
    );
    expect(container.querySelector('input[type=text]')).not.toBeTruthy();
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a numeric textbox', () => {
    const { container } = render(<Textbox id="textbox" onChange={() => {}} type="number" />);
    expect(container.querySelector('input[type=number]')).toBeTruthy();
  });

  it('should focus the input on tab', () => {
    const { container } = render(<Textbox id="textbox" label="Super fantastic label" onChange={() => {}} />);

    container.focus();
    userEvent.tab();

    const input = document.getElementById('textbox');
    expect(input).toHaveFocus();
  });

  it('should allow keyboard input', () => {
    const onChange = jest.fn();
    const { container } = render(<Textbox label="Super fantastic label" onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();

    container.focus();
    userEvent.tab();
    userEvent.keyboard('abc');

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('c');
  });

  it('should be clearable from mouse interaction', () => {
    const onClear = jest.fn();
    const { getByRole } = render(
      <Textbox clearable label="Super fantastic label" onChange={() => {}} onClear={onClear} value="Hello world" />,
    );

    expect(onClear).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('should be clearable from keyboard interaction', () => {
    const onClear = jest.fn();
    const { container } = render(
      <Textbox clearable label="Super fantastic label" onChange={() => {}} onClear={onClear} value="Hello world" />,
    );

    expect(onClear).not.toHaveBeenCalled();

    container.focus();
    userEvent.tab();
    userEvent.tab();
    userEvent.keyboard('[Enter]');

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('should trigger the change event', () => {
    const onChange = jest.fn();
    const { container } = render(<Textbox label="Super fantastic label" onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();

    const textbox = container.querySelector('input');
    textbox && fireEvent.change(textbox, { target: { value: 'Hello world' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('Hello world');
  });

  it('should trigger the input blur and focus events', () => {
    const onInputBlur = jest.fn();
    const onInputFocus = jest.fn();

    const { container } = render(
      <Textbox
        label="Super fantastic label"
        onChange={() => {}}
        onInputBlur={onInputBlur}
        onInputFocus={onInputFocus}
      />,
    );

    expect(onInputBlur).not.toHaveBeenCalled();
    expect(onInputFocus).not.toHaveBeenCalled();

    container.focus();
    userEvent.tab();

    expect(onInputBlur).not.toHaveBeenCalled();
    expect(onInputFocus).toHaveBeenCalledTimes(1);

    userEvent.tab();

    expect(onInputFocus).toHaveBeenCalledTimes(1);
    expect(onInputBlur).toHaveBeenCalledTimes(1);
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByTestId } = render(
      <Textbox data-testid="textbox" label="Super fantastic label" onChange={() => {}} ref={ref} />,
    );

    expect(getByTestId('textbox')).toBe(ref.current);
  });
});

describe('<NotifiedTextbox />', () => {
  it('should render a notified textbox', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <NotifiedTextbox
        label="Super fantastic label"
        level="danger"
        notification="Example notification"
        onChange={onChange}
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('Example notification')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const textbox = container.querySelector('input');
    textbox && fireEvent.change(textbox, { target: { value: 'Hello world' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('Hello world');
  });
});
