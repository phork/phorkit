import React from 'react';
import { PanelContainer } from 'lib';
import { render } from '../../utils';

describe('<PanelContainer />', () => {
  it('should render a panel container', () => {
    const { getByText } = render(<PanelContainer orientation="vertical">Hello world</PanelContainer>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <PanelContainer
        absolute
        full
        reverse
        viewport
        className="panelContainer"
        id="panelContainer"
        orientation="horizontal"
        style={{ color: 'red' }}
      >
        Hello world
      </PanelContainer>,
    );

    const panelContainer = document.getElementById('panelContainer');
    expect(panelContainer?.nodeName).toBe('DIV');
    expect(panelContainer?.style.getPropertyValue('color')).toBe('red');
  });
});
