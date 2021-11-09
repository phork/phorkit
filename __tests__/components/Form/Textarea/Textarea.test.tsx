import React from 'react';
import { Textarea, NotifiedTextarea } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Textarea />', () => {
  it('should render a labeled textarea', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(<Textarea label="Super fantastic label" onChange={onChange} />);
    expect(getByText('Super fantastic label')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const textarea = container.querySelector('textarea');
    textarea && fireEvent.change(textarea, { target: { value: 'Hello world' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('Hello world');
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
