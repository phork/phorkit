import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { CheckboxGroup, NotifiedCheckboxGroup } from 'lib';
import { fireEvent, render } from '../../../utils';

const items = [
  {
    id: 'first',
    name: 'first',
    value: 'first',
    label: 'First',
  },
  {
    id: 'second',
    name: 'second',
    value: 'second',
    label: 'Second',
  },
  {
    id: 'third',
    name: 'third',
    value: 'third',
    label: 'Third',
  },
];

describe('<CheckboxGroup />', () => {
  it('should render a checkbox group', () => {
    const { container, getByText } = render(
      <CheckboxGroup checkboxes={items} layout="stacked" legend="Legendary" onChange={() => {}} values={['first']} />,
    );
    expect(container.querySelectorAll('input[type="checkbox"]').length).toBe(3);
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
  });

  it('should be clickable to checked', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(
      <CheckboxGroup checkboxes={items} layout="stacked" legend="Legendary" onChange={onChange} values={['third']} />,
    );

    expect(onChange).not.toHaveBeenCalled();

    const checkboxes = getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toEqual(['third', 'first']);
  });

  it('should be clickable to unchecked', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(
      <CheckboxGroup checkboxes={items} layout="stacked" legend="Legendary" onChange={onChange} values={['third']} />,
    );

    expect(onChange).not.toHaveBeenCalled();

    const checkboxes = getAllByRole('checkbox');
    fireEvent.click(checkboxes[2]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toEqual([]);
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLFieldSetElement>();
    const { getByTestId } = render(
      <CheckboxGroup
        checkboxes={items}
        data-testid="checkboxGroup"
        layout="stacked"
        legend="Legendary"
        onChange={() => {}}
        ref={ref}
        values={['first']}
      />,
    );

    expect(getByTestId('checkboxGroup')).toBe(ref.current);
  });
});

describe('<NotifiedCheckboxGroup />', () => {
  it('should render a notified checkbox group', () => {
    const { container, getByText } = render(
      <NotifiedCheckboxGroup
        checkboxes={items}
        layout="stacked"
        legend="Legendary"
        level="danger"
        notification="Example notification"
        onChange={() => {}}
        values={['first']}
      />,
    );
    expect(container.querySelectorAll('input[type="checkbox"]').length).toBe(3);
    expect(getByText('Example notification')).toBeTruthy();
  });
});
