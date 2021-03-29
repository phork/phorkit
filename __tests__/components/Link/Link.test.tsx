import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Link } from 'lib';
import * as React from 'react';

describe('<Link />', () => {
  it('should render a basic link', () => {
    const { container, getByText } = render(<Link href="#link">Click me!</Link>);
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#link');
    expect(getByText('Click me!')).toBeTruthy();
  });
});
