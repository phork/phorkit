import { render } from '@testing-library/react';
import React from 'react';
import { List } from 'lib';
import { AsTypeDiv } from '__mocks__/AsType.mock';

describe('<List />', () => {
  it('should render a basic list', () => {
    const { container, getByText } = render(
      <List
        items={[
          { id: 'normal0', label: 'First' },
          { id: 'selected', label: 'Second', selected: true },
          { id: 'normal1', label: 'Third' },
          { id: 'normal2', label: 'Fourth' },
          { id: 'normal3', label: 'Fifth' },
          { id: 'disabled', label: 'Sixth', disabled: true },
          { id: 'inactive', label: 'Seventh', inactive: true },
        ]}
        variant="bordered"
      />,
    );
    expect(container.firstChild?.nodeName).toBe('UL');
    expect(container.querySelectorAll('li').length).toBe(7);
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
    expect(getByText('Fourth')).toBeTruthy();
    expect(getByText('Fifth')).toBeTruthy();
    expect(getByText('Sixth')).toBeTruthy();
    expect(getByText('Seventh')).toBeTruthy();
  });

  it('should render a basic list using a div component', () => {
    const { container } = render(
      <List<'div'>
        as="div"
        items={[
          { id: 'normal0', label: 'First' },
          { id: 'selected', label: 'Second', selected: true },
          { id: 'normal1', label: 'Third' },
          { id: 'normal2', label: 'Fourth' },
          { id: 'normal3', label: 'Fifth' },
          { id: 'disabled', label: 'Sixth', disabled: true },
          { id: 'inactive', label: 'Seventh', inactive: true },
        ]}
        variant="bordered"
      />,
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render a basic list using a functional component', () => {
    const { container } = render(
      <List<'div'>
        as={AsTypeDiv}
        items={[
          { id: 'normal0', label: 'First' },
          { id: 'selected', label: 'Second', selected: true },
          { id: 'normal1', label: 'Third' },
          { id: 'normal2', label: 'Fourth' },
          { id: 'normal3', label: 'Fifth' },
          { id: 'disabled', label: 'Sixth', disabled: true },
          { id: 'inactive', label: 'Seventh', inactive: true },
        ]}
        variant="bordered"
      />,
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
