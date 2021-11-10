import React from 'react';
import { Textbox, NotifiedTextbox } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Textbox />', () => {
  it('should render a labeled textbox', () => {
    const { getByText } = render(<Textbox label="Super fantastic label" onChange={() => {}} />);
    expect(getByText('Super fantastic label')).toBeTruthy();
  });

  it('should fire a change event', () => {
    const onChange = jest.fn();
    const { container } = render(<Textbox label="Super fantastic label" onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();

    const textbox = container.querySelector('input');
    textbox && fireEvent.change(textbox, { target: { value: 'Hello world' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('Hello world');
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
