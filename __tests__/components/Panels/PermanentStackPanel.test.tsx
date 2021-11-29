import React from 'react';
import { PermanentStackPanel } from 'lib';
import { render } from '../../utils';

describe('<PermanentStackPanel />', () => {
  it('should render a permanent stack panel', () => {
    const { getByText } = render(<PermanentStackPanel position="top">Hello world</PermanentStackPanel>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <PermanentStackPanel
        fixed
        flexible
        raised
        className="permanentStackPanel"
        height={30}
        id="permanentStackPanel"
        position="bottom"
        style={{ color: 'red' }}
        unit="percent"
      >
        Hello world
      </PermanentStackPanel>,
    );

    const permanentStackPanel = document.getElementById('permanentStackPanel');
    expect(permanentStackPanel?.nodeName).toBe('DIV');
    expect(permanentStackPanel?.style.getPropertyValue('color')).toBe('red');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <PermanentStackPanel data-testid="panel" position="top" ref={ref}>
        Hello world
      </PermanentStackPanel>,
    );

    expect(getByTestId('panel')).toBe(ref.current);
  });
});
