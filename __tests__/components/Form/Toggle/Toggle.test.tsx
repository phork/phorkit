import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { Toggle, NotifiedToggle } from 'lib';

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

  it('should render a notified toggle', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <NotifiedToggle onChange={onChange} level="danger" notification="Example notification">
        Super fantastic label
      </NotifiedToggle>,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('Example notification')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const toggle = container.querySelector('input');
    toggle && fireEvent.click(toggle);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(true);
  });
});
