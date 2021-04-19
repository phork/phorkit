import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { Textbox, NotifiedTextbox } from 'lib';

describe('<Textbox />', () => {
  it('should render a labeled textbox', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(<Textbox label="Super fantastic label" onChange={onChange} />);
    expect(getByText('Super fantastic label')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const textbox = container.querySelector('input');
    textbox && fireEvent.change(textbox, { target: { value: 'Hello world' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('Hello world');
  });

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
