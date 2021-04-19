import { render } from '@testing-library/react';
import * as React from 'react';
import { InlineDropdown } from 'lib';

export const options = [
  { id: 'red', value: 'fancy-red', label: 'Red' },
  { id: 'red-orange', value: 'fancy-red-orange', label: 'Red orange' },
  { id: 'orange', label: 'Orange' },
  { id: 'orange-yellow', label: 'Orange yellow' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'yellow-green', label: 'Yellow green' },
  { id: 'green', label: 'Green' },
  { id: 'green-blue', label: 'Green blue' },
  { id: 'blue', label: 'Blue' },
  { id: 'blue-indigo', label: 'Blue indigo' },
  { id: 'indigo', label: 'Indigo' },
  { id: 'indigo-violet', label: 'Indigo violet' },
  { id: 'violet', label: 'Violet' },
  { id: 'violet-red', label: 'Violet red' },
];

describe('<InlineDropdown />', () => {
  it('should render a basic inline dropdown', () => {
    const onSelect = jest.fn();

    const { getByText } = render(
      <InlineDropdown
        initialSelected={options[3]}
        label="Super fantastic label"
        layout="raised"
        onSelect={onSelect}
        options={options}
        transitional
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
  });
});
