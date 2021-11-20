import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Link } from 'lib';
import { render } from '../../utils';

describe('<Link />', () => {
  it('should render a link', () => {
    const { container, getByText } = render(<Link href="#link">Click me!</Link>);
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#link');
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render a link with a target', () => {
    const { container, getByText } = render(
      <Link href="#link" target="_blank">
        Click me!
      </Link>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('target', '_blank');
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <Link
        block
        contrast
        underline
        unstyled
        unthemed
        className="link"
        href="#link"
        id="link"
        style={{ color: 'red' }}
        themeId="dark"
      >
        Click me!
      </Link>,
    );

    const link = document.getElementById('link');
    expect(link?.nodeName).toBe('A');
    expect(link?.style.getPropertyValue('color')).toBe('red');
  });
});
