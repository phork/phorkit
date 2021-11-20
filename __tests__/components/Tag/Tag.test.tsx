import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Tag } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { fireEvent, render } from '../../utils';

describe('<Tag />', () => {
  it('should render a tag', () => {
    const { getByText } = render(<Tag>Tag me!</Tag>);
    expect(getByText('Tag me!')).toBeTruthy();
  });

  it('should render as a div', () => {
    const { container } = render(<Tag>Tag me!</Tag>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render as an anchor', () => {
    const { container, getByText } = render(
      <Tag<'a'> actionable as="a" href="#tag">
        Tag me!
      </Tag>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#tag');
    expect(getByText('Tag me!')).toBeTruthy();
  });

  it('should render as a button', () => {
    const onClick = jest.fn();
    const { container, getByText } = render(
      <Tag<'button'> actionable as="button" onClick={onClick}>
        Tag me!
      </Tag>,
    );
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(getByText('Tag me!')).toBeTruthy();

    expect(onClick).not.toHaveBeenCalled();

    const tag = getByText('Tag me!');
    fireEvent.click(tag);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(
      <Tag<'a'> actionable as={AsTypeA} href="#tag">
        Tag me!
      </Tag>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#tag');
    expect(getByText('Tag me!')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <Tag
        actionable
        active
        contrast
        flush
        focused
        hovered
        unthemed
        className="tag"
        id="tag"
        shape="brick"
        size="medium"
        style={{ color: 'red' }}
        themeId="dark"
        weight="solid"
      >
        Tag me!
      </Tag>,
    );

    const tag = document.getElementById('tag');
    expect(tag?.nodeName).toBe('BUTTON');
    expect(tag?.style.getPropertyValue('color')).toBe('red');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Tag data-testid="tag" ref={ref}>
        Tag me!
      </Tag>,
    );

    expect(getByTestId('tag')).toBe(ref.current);
  });
});
