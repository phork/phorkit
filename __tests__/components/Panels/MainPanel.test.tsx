import React from 'react';
import { MainPanel } from 'lib';
import { render } from '../../utils';

describe('<MainPanel />', () => {
  it('should render a main panel', () => {
    const { getByText } = render(<MainPanel>Hello world</MainPanel>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <MainPanel className="mainPanel" id="mainPanel" style={{ color: 'red' }}>
        Hello world
      </MainPanel>,
    );

    const mainPanel = document.getElementById('mainPanel');
    expect(mainPanel?.nodeName).toBe('DIV');
    expect(mainPanel?.style.getPropertyValue('color')).toBe('red');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <MainPanel data-testid="panel" ref={ref}>
        Hello world
      </MainPanel>,
    );

    expect(getByTestId('panel')).toBe(ref.current);
  });
});
