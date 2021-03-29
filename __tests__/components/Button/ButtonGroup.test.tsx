import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { ButtonGroup } from 'lib';
import * as React from 'react';

describe('<ButtonGroup />', () => {
  it('should render a basic button group', () => {
    const { container, getByText } = render(
      <ButtonGroup
        buttons={[
          { id: 'first', label: 'First', selected: false },
          { id: 'second', label: 'Second', selected: true },
          { id: 'third', label: 'Third', selected: false },
          { id: 'fourth', label: 'Fourth', selected: true },
        ]}
        color="primary"
        onClick={() => {}}
        overlap
        spacing="joined"
      />,
    );
    expect(container.querySelectorAll('button').length).toBe(4);
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
    expect(getByText('Fourth')).toBeTruthy();
  });

  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <ButtonGroup
        buttons={[
          { id: 'first', label: 'First', selected: false },
          { id: 'second', label: 'Second', selected: true },
          { id: 'third', label: 'Third', selected: false },
          { id: 'fourth', label: 'Fourth', selected: true },
        ]}
        color="primary"
        onClick={onClick}
        overlap
        spacing="joined"
      />,
    );

    expect(onClick).not.toHaveBeenCalled();

    const buttons = getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[onClick.mock.calls.length - 1][1]).toBe('first');

    fireEvent.click(buttons[1]);

    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onClick.mock.calls[onClick.mock.calls.length - 1][1]).toBe('second');
  });
});
