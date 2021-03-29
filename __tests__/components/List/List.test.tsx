import { render } from '@testing-library/react';
import { List } from 'lib';
import * as React from 'react';

describe('<List />', () => {
  it('should render a basic list', () => {
    const { container, getByText } = render(
      <List
        outline="bordered"
        items={[
          { id: 'normal0', label: 'First' },
          { id: 'selected', label: 'Second', selected: true },
          { id: 'normal1', label: 'Third' },
          { id: 'normal2', label: 'Fourth' },
          { id: 'normal3', label: 'Fifth' },
          { id: 'disabled', label: 'Sixth', disabled: true },
          { id: 'inactive', label: 'Seventh', inactive: true },
        ]}
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
});
