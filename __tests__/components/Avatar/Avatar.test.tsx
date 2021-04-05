import { render } from '@testing-library/react';
import { AsTypeA } from '__mocks__/AsType.mock';
import { Avatar } from 'lib';
import * as React from 'react';

describe('<Avatar />', () => {
  it('should render a basic avatar', () => {
    const { container } = render(<Avatar initials="EC" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render an avatar as a button', () => {
    const { container } = render(<Avatar actionable initials="EC" />);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  it('should render an avatar as a link', () => {
    const { container } = render(<Avatar<'a'> as="a" href="#avatar" initials="EC" />);
    expect(container.firstChild?.nodeName).toBe('A');
  });

  it('should render an avatar using a functional component', () => {
    const { container } = render(<Avatar<'a'> as={AsTypeA} href="#avatar" initials="EC" />);
    expect(container.firstChild?.nodeName).toBe('A');
  });
});
