import React from 'react';
import { StyledNavigation } from 'lib';
import { render } from '../../utils';

const styles = {
  focusedBorderColor: '#f41150',
  itemBackgroundColor: 'transparent',
  itemFocusedBackgroundColor: '#f41150',
  itemFocusedSelectedBackgroundColor: '#F86F95',
  itemFocusedSelectedTextColor: '#fff',
  itemFocusedTextColor: '#fff',
  itemHoveredBorderColor: '#f41150',
  itemSelectedBackgroundColor: '#F86F95',
  itemSelectedBorderColor: '#f41150',
  itemSelectedTextColor: '#fff',
  itemTextColor: '#f41150',
};

const items = [
  { id: 'first', label: 'First' },
  { id: 'second', label: 'Second' },
  { id: 'third', label: 'Third', disabled: true },
  { id: 'fourth', label: 'Fourth' },
];

describe('<StyledNavigation />', () => {
  it('should render a navigation', () => {
    const { getByText } = render(<StyledNavigation items={items} selectedId="first" {...styles} />);

    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
    expect(getByText('Fourth')).toBeTruthy();
  });
});
