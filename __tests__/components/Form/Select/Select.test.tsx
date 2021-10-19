import React from 'react';
import { Select, NotifiedSelect } from 'lib';
import { fireEvent, render } from '../../../utils';

const options = [
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'violet', label: 'Violet' },
];

describe('<Select />', () => {
  it('should render a labeled select', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <Select
        transitional
        label="Super fantastic label"
        onChange={onChange}
        options={options.map(item => ({ ...item, 'data-testid': 'select-option' }))}
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const select = container.querySelector('select');
    select && fireEvent.change(select, { target: { value: 'yellow' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('yellow');
  });

  it('should render a notified select', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <NotifiedSelect
        transitional
        label="Super fantastic label"
        level="danger"
        notification="Example notification"
        onChange={onChange}
        options={options.map(item => ({ ...item, 'data-testid': 'select-option' }))}
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('Example notification')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const select = container.querySelector('select');
    select && fireEvent.change(select, { target: { value: 'yellow' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('yellow');
  });
});
