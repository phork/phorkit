import { render } from '@testing-library/react';
import { Navigation } from 'lib';
import * as React from 'react';

describe('<Navigation />', () => {
  it('should render a basic navigation', () => {
    const { getByText } = render(
      <Navigation
        selectedId="first"
        items={[
          { id: 'first', label: 'First' },
          { id: 'second', label: 'Second' },
          { id: 'third', label: 'Third', disabled: true },
          { id: 'fourth', label: 'Fourth' },
        ]}
      />,
    );
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
    expect(getByText('Fourth')).toBeTruthy();
  });
});
