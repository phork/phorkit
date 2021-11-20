import React from 'react';
import { StackPanel } from 'lib';
import { render } from '../../utils';

describe('<StackPanel />', () => {
  it('should render a stack panel', () => {
    const { getByText } = render(
      <StackPanel height={200} position="top">
        Hello world
      </StackPanel>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <StackPanel
        fixed
        open
        raised
        className="stackPanel"
        easing={(percent: number) => percent}
        height={30}
        id="stackPanel"
        onCloseFinish={() => {}}
        onCloseStart={() => {}}
        onOpenFinish={() => {}}
        onOpenStart={() => {}}
        position="bottom"
        style={{ color: 'red' }}
        transition="squashable"
        unit="percent"
      >
        Hello world
      </StackPanel>,
    );

    const stackPanel = document.getElementById('stackPanel');
    expect(stackPanel?.nodeName).toBe('DIV');
    expect(stackPanel?.style.getPropertyValue('color')).toBe('red');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <StackPanel data-testid="panel" height={100} position="top" ref={ref}>
        Hello world
      </StackPanel>,
    );

    expect(getByTestId('panel')).toBe(ref.current);
  });
});
