import React from 'react';
import { Divider } from 'lib';
import { render } from '../../utils';

describe('<Divider />', () => {
  it('should render a divider', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should accept the rest of the props', () => {
    render(
      <Divider
        unthemed
        className="divider"
        id="divider"
        orientation="vertical"
        style={{ color: 'red' }}
        themeId="dark"
        variant="secondary"
        volume="quiet"
      />,
    );

    const divider = document.getElementById('divider');
    expect(divider?.nodeName).toBe('DIV');
    expect(divider?.style.getPropertyValue('color')).toBe('red');
  });
});
