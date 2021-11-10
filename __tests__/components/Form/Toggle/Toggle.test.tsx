import React from 'react';
import { Toggle, NotifiedToggle } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Toggle />', () => {
  it('should render a labeled toggle', () => {
    const { getByText } = render(<Toggle onChange={() => {}}>Super fantastic label</Toggle>);
    expect(getByText('Super fantastic label')).toBeTruthy();
  });

  it('should fire a change event', () => {
    const onChange = jest.fn();
    const { container } = render(<Toggle onChange={onChange}>Super fantastic label</Toggle>);

    expect(onChange).not.toHaveBeenCalled();

    const toggle = container.querySelector('input');
    toggle && fireEvent.click(toggle);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(true);
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { container } = render(
      <Toggle onChange={() => {}} ref={ref}>
        Super fantastic label
      </Toggle>,
    );

    expect(container.querySelector('input')).toBe(ref.current);
  });
});

describe('<NotifiedToggle />', () => {
  it('should render a notified toggle', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <NotifiedToggle level="danger" notification="Example notification" onChange={onChange}>
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
