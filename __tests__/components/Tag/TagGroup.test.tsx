import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { TagGroup } from 'lib';
import * as React from 'react';

describe('<TagGroup />', () => {
  it('should render a basic tag group', () => {
    const { container, getByText } = render(
      <TagGroup
        tags={[
          { id: 'first', label: 'First' },
          { id: 'second', label: 'Second' },
          { id: 'third', label: 'Third' },
        ]}
      />,
    );
    expect(container.querySelectorAll('div').length).toBe(4); // include the parent div
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
  });

  it('render a tag group as clickable buttons', () => {
    const onClick = jest.fn();
    const { container } = render(
      <TagGroup<'button'>
        actionable
        tags={[
          { id: 'first', label: 'First', as: 'button', onClick },
          { id: 'second', label: 'Second', as: 'button', onClick },
          { id: 'third', label: 'Third', as: 'button', onClick },
        ]}
      />,
    );

    expect(onClick).not.toHaveBeenCalled();

    const tags = container.querySelectorAll('button');
    fireEvent.click(tags[0]);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});