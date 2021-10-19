import React from 'react';
import { DropdownWithTags } from 'lib';
import { render } from '../../utils';

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

describe('<DropdownWithTags />', () => {
  it('should render a dropdown with 1 item selected', () => {
    const onSelect = jest.fn();

    const { getByText, getAllByText } = render(
      <DropdownWithTags
        transitional
        initialSelected={[options[3]]}
        label="Super fantastic label"
        layout="raised"
        onSelect={onSelect}
        options={options}
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('1 item selected')).toBeTruthy();
    expect(getAllByText('Orange yellow').length).toEqual(2);
    expect(getAllByText('Red').length).toEqual(1);
  });

  it('should render a dropdown with 2 items selected', () => {
    const onSelect = jest.fn();

    const { getByText, getAllByText } = render(
      <DropdownWithTags
        transitional
        initialSelected={[options[3], options[5]]}
        label="Super fantastic label"
        layout="raised"
        onSelect={onSelect}
        options={options}
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('2 items selected')).toBeTruthy();
    expect(getAllByText('Orange yellow').length).toEqual(2);
    expect(getAllByText('Yellow green').length).toEqual(2);
    expect(getAllByText('Red').length).toEqual(1);
  });

  it('should render a dropdown with a placeholder', () => {
    const onSelect = jest.fn();

    const { getByText, getAllByText } = render(
      <DropdownWithTags
        transitional
        initialSelected={[]}
        label="Super fantastic label"
        layout="raised"
        onSelect={onSelect}
        options={options}
        placeholder="Select one"
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('Select one')).toBeTruthy();
    expect(getAllByText('Red').length).toEqual(1);
  });

  it('should render an empty dropdown', () => {
    const onSelect = jest.fn();

    const { getByText } = render(
      <DropdownWithTags
        transitional
        initialSelected={[]}
        label="Super fantastic label"
        onSelect={onSelect}
        options={[]}
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('No options are available.')).toBeTruthy();
  });
});
