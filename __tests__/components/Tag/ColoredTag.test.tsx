import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { ColoredTag } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { fireEvent, render } from '../../utils';

describe('<ColoredTag />', () => {
  it('should render a tag', () => {
    const { getByText } = render(<ColoredTag colorId="P10">Click me!</ColoredTag>);
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render as a div', () => {
    const { container } = render(<ColoredTag colorId="P10">Click me!</ColoredTag>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render as an anchor', () => {
    const { container, getByText } = render(
      <ColoredTag<'a'> actionable as="a" colorId="P10" href="#tag">
        Click me!
      </ColoredTag>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#tag');
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render as a button', () => {
    const onClick = jest.fn();
    const { container, getByText } = render(
      <ColoredTag<'button'> actionable as="button" colorId="P10" onClick={onClick}>
        Click me!
      </ColoredTag>,
    );
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(getByText('Click me!')).toBeTruthy();

    expect(onClick).not.toHaveBeenCalled();

    const tag = getByText('Click me!');
    fireEvent.click(tag);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(
      <ColoredTag<'a'> actionable as={AsTypeA} colorId="P10" href="#tag">
        Click me!
      </ColoredTag>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#tag');
    expect(getByText('Click me!')).toBeTruthy();
  });
});
