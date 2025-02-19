import '@testing-library/jest-dom';
import React from 'react';
import { Divider } from 'lib';
import { render } from '../../utils';

describe('<Divider />', () => {
  it('should render a default hr element', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild?.nodeName).toBe('HR');
  });

  it('should render a div element when specified', () => {
    const { container } = render(<Divider<'div'> as="div" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should accept additional props', () => {
    render(
      <Divider
        unthemed
        className="custom-divider"
        id="divider"
        orientation="vertical"
        style={{ color: 'red' }}
        themeId="dark"
        variant="secondary"
        volume="quiet"
      />,
    );

    const divider = document.getElementById('divider');
    expect(divider?.nodeName).toBe('HR');
    expect(divider?.style.getPropertyValue('color')).toBe('red');
    expect(divider?.classList).toContain('custom-divider');
  });

  it('should have role="separator"', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveAttribute('role', 'separator');
  });

  it('should have the correct aria-orientation', () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(container.firstChild).toHaveAttribute('aria-orientation', 'vertical');
  });
});
