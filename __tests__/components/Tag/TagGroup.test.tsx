import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Tag, TagGroup } from 'lib';

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
      <TagGroup>
        <Tag<'button'> as="button" key="first" onClick={() => onClick('first')}>
          First
        </Tag>
        <Tag<'button'> as="button" key="second" onClick={() => onClick('second')}>
          Second
        </Tag>
        <Tag<'button'> as="button" key="third" onClick={() => onClick('third')}>
          Third
        </Tag>
      </TagGroup>,
    );

    expect(onClick).not.toHaveBeenCalled();

    const tags = container.querySelectorAll('button');
    fireEvent.click(tags[0]);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[onClick.mock.calls.length - 1][0]).toBe('first');

    fireEvent.click(tags[1]);

    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onClick.mock.calls[onClick.mock.calls.length - 1][0]).toBe('second');

    fireEvent.click(tags[2]);

    expect(onClick).toHaveBeenCalledTimes(3);
    expect(onClick.mock.calls[onClick.mock.calls.length - 1][0]).toBe('third');
  });
});
