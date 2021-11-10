import React from 'react';
import { Navigation } from 'lib';
import { render } from '../../utils';

const items = [
  { id: 'first', label: 'First' },
  { id: 'second', label: 'Second' },
  { id: 'third', label: 'Third', disabled: true },
  { id: 'fourth', label: 'Fourth' },
];

describe('<Navigation />', () => {
  it('should render a navigation', () => {
    const { getByText } = render(<Navigation items={items} selectedId="first" />);

    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
    expect(getByText('Fourth')).toBeTruthy();
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLElement>();
    const { getByTestId } = render(<Navigation data-testid="navigation" items={items} ref={ref} selectedId="first" />);

    expect(getByTestId('navigation')).toBe(ref.current);
  });
});
