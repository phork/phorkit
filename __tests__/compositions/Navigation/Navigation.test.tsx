import { render } from '@testing-library/react';
import React from 'react';
import { Navigation } from 'lib';

describe('<Navigation />', () => {
  it('should render a basic navigation', () => {
    const { getByText } = render(
      <Navigation
        items={[
          { id: 'first', label: 'First' },
          { id: 'second', label: 'Second' },
          { id: 'third', label: 'Third', disabled: true },
          { id: 'fourth', label: 'Fourth' },
        ]}
        selectedId="first"
      />,
    );
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
    expect(getByText('Fourth')).toBeTruthy();
  });
});
