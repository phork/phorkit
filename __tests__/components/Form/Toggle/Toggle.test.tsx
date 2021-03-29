import { fireEvent, render } from '@testing-library/react';
import { Toggle } from 'lib';
import * as React from 'react';

describe('<Toggle />', () => {
  it('should render a labeled toggle', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(<Toggle onChange={onChange}>Super fantastic label</Toggle>);
    expect(getByText('Super fantastic label')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const toggle = container.querySelector('input');
    toggle && fireEvent.click(toggle);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(true);
  });
});
