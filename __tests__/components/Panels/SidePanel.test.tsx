import React from 'react';
import { SidePanel } from 'lib';
import { render } from '../../utils';

describe('<SidePanel />', () => {
  it('should render a side panel', () => {
    const { getByText } = render(
      <SidePanel position="left" width={200}>
        Hello world
      </SidePanel>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <SidePanel
        fixed
        open
        raised
        className="sidePanel"
        easing={(percent: number) => percent}
        id="sidePanel"
        onCloseFinish={() => {}}
        onCloseStart={() => {}}
        onOpenFinish={() => {}}
        onOpenStart={() => {}}
        position="right"
        style={{ color: 'red' }}
        transition="squashable"
        unit="percent"
        width={30}
      >
        Hello world
      </SidePanel>,
    );

    const sidePanel = document.getElementById('sidePanel');
    expect(sidePanel?.nodeName).toBe('DIV');
    expect(sidePanel?.style.getPropertyValue('color')).toBe('red');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <SidePanel data-testid="panel" position="left" ref={ref} width={100}>
        Hello world
      </SidePanel>,
    );

    expect(getByTestId('panel')).toBe(ref.current);
  });
});
