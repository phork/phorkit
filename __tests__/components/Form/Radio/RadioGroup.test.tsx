import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { RadioGroup, NotifiedRadioGroup } from 'lib';
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

describe('<RadioGroup />', () => {
  it('should render a radio group', () => {
    const { container, getByText } = render(
      <RadioGroup
        layout="stacked"
        legend="Legendary"
        name="radio"
        onChange={() => {}}
        radios={items}
        value={'first'}
      />,
    );
    expect(container.querySelectorAll('input[type="radio"]').length).toBe(3);
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
  });

  it('should be clickable', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(
      <RadioGroup
        layout="stacked"
        legend="Legendary"
        name="radio"
        onChange={onChange}
        radios={items}
        value={'third'}
      />,
    );

    expect(onChange).not.toHaveBeenCalled();

    const radios = getAllByRole('radio');
    fireEvent.click(radios[0]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toEqual('first');

    fireEvent.click(radios[1]);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toEqual('second');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLFieldSetElement>();
    const { getByTestId } = render(
      <RadioGroup
        data-testid="radioGroup"
        layout="stacked"
        legend="Legendary"
        name="radio"
        onChange={() => {}}
        radios={items}
        ref={ref}
        value="first"
      />,
    );

    expect(getByTestId('radioGroup')).toBe(ref.current);
  });
});

describe('<NotifiedRadioGroup />', () => {
  it('should render a notified radio group', () => {
    const { container, getByText } = render(
      <NotifiedRadioGroup
        layout="stacked"
        legend="Legendary"
        level="danger"
        name="radio"
        notification="Example notification"
        onChange={() => {}}
        radios={items}
        value={'first'}
      />,
    );
    expect(container.querySelectorAll('input[type="radio"]').length).toBe(3);
    expect(getByText('Example notification')).toBeTruthy();
  });
});
