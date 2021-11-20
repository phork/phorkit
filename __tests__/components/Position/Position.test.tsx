import React from 'react';
import { Position } from 'lib';
import { render } from '../../utils';

describe('<Position />', () => {
  it('should render a position container', () => {
    const { getByText } = render(<Position location="top-center">Hello world</Position>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <Position
        fixed
        raised
        className="position"
        id="position"
        location="top-center"
        style={{ color: 'red' }}
        variant="inside"
      >
        Hello world
      </Position>,
    );

    const position = document.getElementById('position');
    expect(position?.nodeName).toBe('DIV');
    expect(position?.style.getPropertyValue('color')).toBe('red');
  });
});
