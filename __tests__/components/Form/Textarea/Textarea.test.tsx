import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Textarea, NotifiedTextarea } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Textarea />', () => {
  it('should render a labeled textarea', () => {
    const { getByText } = render(<Textarea label="Super fantastic label" onChange={() => {}} />);
    expect(getByText('Super fantastic label')).toBeTruthy();
  });

  it('should render a textarea with a value', () => {
    const { container } = render(<Textarea id="textarea" onChange={() => {}} value="Hello world" />);

    const input = document.getElementById('textarea');
    expect(input).toHaveValue('Hello world');
    expect(container.querySelector('textarea')).toBeTruthy();
  });

  it('should render a read only textarea with a value', () => {
    const { container, getByText } = render(
      <Textarea readOnly label="Super fantastic label" onChange={() => {}} value="Hello world" />,
    );
    expect(container.querySelector('textarea')).not.toBeTruthy();
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should focus the input on tab', () => {
    const { container } = render(<Textarea id="textarea" label="Super fantastic label" onChange={() => {}} />);

    container.focus();
    userEvent.tab();

    const input = document.getElementById('textarea');
    expect(input).toHaveFocus();
  });

  it('should allow keyboard input', () => {
    const onChange = jest.fn();
    const { container } = render(<Textarea label="Super fantastic label" onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();

    container.focus();
    userEvent.tab();
    userEvent.keyboard('abc');

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('c');
  });

  it('should trigger an onChange event', () => {
    const onChange = jest.fn();
    const { container } = render(<Textarea label="Super fantastic label" onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();

    const textarea = container.querySelector('textarea');
    textarea && fireEvent.change(textarea, { target: { value: 'Hello world' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('Hello world');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    const { getByTestId } = render(
      <Textarea data-testid="textarea" label="Super fantastic label" onChange={() => {}} ref={ref} />,
    );

    expect(getByTestId('textarea')).toBe(ref.current);
  });
});

describe('<NotifiedTextarea />', () => {
  it('should render a notified textarea', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <NotifiedTextarea
        label="Super fantastic label"
        level="danger"
        notification="Example notification"
        onChange={onChange}
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('Example notification')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const textarea = container.querySelector('textarea');
    textarea && fireEvent.change(textarea, { target: { value: 'Hello world' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('Hello world');
  });
});
