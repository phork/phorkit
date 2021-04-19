import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { AsTypeA } from '__mocks__/AsType.mock';
import { Tag } from 'lib';

describe('<Tag />', () => {
  it('should render a basic tag', () => {
    const { container, getByText } = render(<Tag label="Click me!" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render a tag as an anchor', () => {
    const { container, getByText } = render(<Tag<'a'> as="a" actionable href="#tag" label="Click me!" />);
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#tag');
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render a tag as a clickable button', () => {
    const onClick = jest.fn();
    const { container, getByText } = render(
      <Tag<'button'> as="button" actionable onClick={onClick} label="Click me!" />,
    );
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(getByText('Click me!')).toBeTruthy();

    expect(onClick).not.toHaveBeenCalled();

    const tag = getByText('Click me!');
    fireEvent.click(tag);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render a tag using a functional component', () => {
    const { container, getByText } = render(<Tag<'a'> as={AsTypeA} actionable href="#tag" label="Click me!" />);
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#tag');
    expect(getByText('Click me!')).toBeTruthy();
  });
});
