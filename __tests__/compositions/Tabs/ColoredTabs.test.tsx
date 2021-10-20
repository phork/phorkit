import React from 'react';
import { ColoredTabs } from 'lib';
import { render } from '../../utils';

const items = [
  { id: 'first', label: 'First', content: 'First panel' },
  { id: 'second', label: 'Second', content: 'Second panel' },
  { id: 'third', label: 'Third', content: 'Third panel', disabled: true },
  { id: 'fourth', label: 'Fourth', content: 'Fourth panel' },
];

describe('<ColoredTabs />', () => {
  it('should render basic tabs', () => {
    const { getByText } = render(<ColoredTabs colorId="P10" items={items} />);

    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
    expect(getByText('Fourth')).toBeTruthy();

    expect(getByText('First panel')).toBeTruthy();
    expect(getByText('Second panel')).toBeTruthy();
    expect(getByText('Third panel')).toBeTruthy();
    expect(getByText('Fourth panel')).toBeTruthy();
  });
});
