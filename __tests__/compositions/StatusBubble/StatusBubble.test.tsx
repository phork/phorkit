import { render } from '@testing-library/react';
import React from 'react';
import { StatusBubble } from 'lib';

describe('<StatusBubble />', () => {
  it('should render a status bubble', () => {
    const { queryByText } = render(
      <StatusBubble anchor={<div>Anchor</div>} header="Header">
        Hello world
      </StatusBubble>,
    );

    expect(queryByText('Header')).toBeTruthy();
    expect(queryByText('Hello world')).toBeTruthy();
    expect(queryByText('Anchor')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <StatusBubble
        squared
        unbordered
        anchor={<div>Anchor</div>}
        className="shade"
        color="primary"
        header="Header"
        id="shade"
        offset={{ vertical: 10, horizontal: 10 }}
        position="left-top"
        style={{ color: 'red' }}
        themeId="dark"
        triangleBorderColor="red"
        triangleColor="red"
        triangleSize={8}
      >
        Hello world
      </StatusBubble>,
    );

    const shade = document.getElementById('shade');
    expect(shade?.nodeName).toBe('DIV');
    expect(shade?.style.getPropertyValue('color')).toBe('red');
  });
});
