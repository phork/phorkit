import React from 'react';
import { Footer } from 'lib';
import { render } from '../../utils';

describe('<Footer />', () => {
  it('should render a footer', () => {
    const { getByText } = render(<Footer>Hello world</Footer>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render the contrast colors', () => {
    const { getByText } = render(<Footer contrast>Hello world</Footer>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <Footer
        full
        transparent
        unthemed
        bordered="pseudo"
        className="footer"
        id="footer"
        style={{ color: 'red' }}
        themeId="dark"
        variant="primary"
        volume="quiet"
      >
        Hello world
      </Footer>,
    );

    const footer = document.getElementById('footer');
    expect(footer?.nodeName).toBe('DIV');
    expect(footer?.style.getPropertyValue('color')).toBe('red');
  });
});
