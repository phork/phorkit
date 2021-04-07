import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { CheckboxGroup, NotifiedCheckboxGroup } from 'lib';
import * as React from 'react';

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
  it('should render a basic checkbox group', () => {
    const { container, getByText } = render(
      <CheckboxGroup checkboxes={items} layout="stacked" legend="Legendary" onChange={() => {}} values={['first']} />,
    );
    expect(container.querySelectorAll('input[type="checkbox"]').length).toBe(3);
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
  });

  it('should be clickable', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(
      <CheckboxGroup checkboxes={items} layout="stacked" legend="Legendary" onChange={onChange} values={['third']} />,
    );

    expect(onChange).not.toHaveBeenCalled();

    const checkboxes = getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toEqual(['third', 'first']);

    fireEvent.click(checkboxes[1]);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toEqual(['third', 'second']);
  });

  it('should render a notified checkbox group', () => {
    const { container, getByText } = render(
      <NotifiedCheckboxGroup
        checkboxes={items}
        layout="stacked"
        legend="Legendary"
        onChange={() => {}}
        values={['first']}
        level="danger"
        notification="Example notification"
      />,
    );
    expect(container.querySelectorAll('input[type="checkbox"]').length).toBe(3);
    expect(getByText('Example notification')).toBeTruthy();
  });
});
