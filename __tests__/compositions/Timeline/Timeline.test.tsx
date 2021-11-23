import { render } from '@testing-library/react';
import React from 'react';
import { Timeline, TimelineMarkerItemProps } from 'lib';

const items = [
  {
    id: 'one',
    children: <div>Hello world</div>,
    color: 'primary' as TimelineMarkerItemProps['color'],
  },
  {
    id: 'two',
    children: <div>Hello world</div>,
    color: 'success' as TimelineMarkerItemProps['color'],
  },
  {
    id: 'three',
    children: <div>Hello world</div>,
    color: 'warning' as TimelineMarkerItemProps['color'],
  },
  {
    id: 'four',
    children: <div>Hello world</div>,
    color: 'danger' as TimelineMarkerItemProps['color'],
  },
];

describe('<Timeline />', () => {
  it('should render multiple timeline items', () => {
    const { getAllByText } = render(<Timeline items={items} />);
    expect(getAllByText('Hello world').length).toBe(4);
  });

  it('should accept the rest of the props', () => {
    render(<Timeline className="timeline" id="timeline" items={items} style={{ color: 'red' }} themeId="dark" />);

    const timeline = document.getElementById('timeline');
    expect(timeline?.nodeName).toBe('DIV');
    expect(timeline?.style.getPropertyValue('color')).toBe('red');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(<Timeline data-testid="timeline" items={items} ref={ref} />);

    expect(getByTestId('timeline')).toBe(ref.current);
  });
});
