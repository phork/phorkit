import React from 'react';
import { PermanentSidePanel } from 'lib';
import { render } from '../../utils';

describe('<PermanentSidePanel />', () => {
  it('should render a permanent side panel', () => {
    const { getByText } = render(<PermanentSidePanel position="left">Hello world</PermanentSidePanel>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <PermanentSidePanel
        fixed
        flexible
        raised
        className="permanentSidePanel"
        id="permanentSidePanel"
        position="right"
        style={{ color: 'red' }}
        unit="percent"
        width={30}
      >
        Hello world
      </PermanentSidePanel>,
    );

    const permanentSidePanel = document.getElementById('permanentSidePanel');
    expect(permanentSidePanel?.nodeName).toBe('DIV');
    expect(permanentSidePanel?.style.getPropertyValue('color')).toBe('red');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <PermanentSidePanel data-testid="panel" position="left" ref={ref}>
        Hello world
      </PermanentSidePanel>,
    );

    expect(getByTestId('panel')).toBe(ref.current);
  });
});
