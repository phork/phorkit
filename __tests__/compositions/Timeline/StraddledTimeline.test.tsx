import { render } from '@testing-library/react';
import React from 'react';
import { StraddledTimeline, TimelineDividerItem, TimelineMarkerItem, TimelineMarkerItemProps } from 'lib';

const items = [
  {
    id: 'one',
    children: <div>Hello world</div>,
    color: 'primary' as TimelineMarkerItemProps['color'],
    position: 'left-center' as TimelineMarkerItemProps['position'],
  },
  {
    id: 'two',
    children: <div>Hello world</div>,
    color: 'success' as TimelineMarkerItemProps['color'],
    position: 'right-center' as TimelineMarkerItemProps['position'],
  },
  {
    id: 'three',
    children: <div>Hello world</div>,
    color: 'warning' as TimelineMarkerItemProps['color'],
    position: 'left-center' as TimelineMarkerItemProps['position'],
  },
  {
    id: 'four',
    children: <div>Hello world</div>,
    color: 'danger' as TimelineMarkerItemProps['color'],
    position: 'right-center' as TimelineMarkerItemProps['position'],
  },
];

describe('<StraddledTimeline />', () => {
  it('should render multiple timeline items', () => {
    const { getAllByText } = render(<StraddledTimeline items={items} leftWidth={100} rightWidth={200} />);
    expect(getAllByText('Hello world').length).toBe(4);
  });

  it('should set the timeline size', () => {
    const { getByTestId } = render(
      <StraddledTimeline data-testid="timeline" items={items} leftWidth={100} rightWidth={200} />,
    );

    const timeline = getByTestId('timeline');
    expect(timeline?.style.getPropertyValue('width')).toBe('289px');
  });

  it('should set the timeline item sizes', () => {
    const { getByTestId } = render(
      <StraddledTimeline
        data-testid="timeline"
        items={items.map(item => ({ ...item, 'data-testid': `item-${item.id}` }))}
        leftWidth={100}
        rightWidth={200}
      />,
    );

    expect(getByTestId('item-one').style.getPropertyValue('width')).toBe('100px');
    expect(getByTestId('item-two').style.getPropertyValue('width')).toBe('200px');
    expect(getByTestId('item-three').style.getPropertyValue('width')).toBe('100px');
    expect(getByTestId('item-four').style.getPropertyValue('width')).toBe('200px');
  });

  it('should render from children', () => {
    const { getAllByText } = render(
      <StraddledTimeline leftWidth={180} rightWidth={200}>
        <TimelineMarkerItem first color="primary" width={200}>
          Hello world
        </TimelineMarkerItem>
        <TimelineMarkerItem color="primary" width={200}>
          Hello world
        </TimelineMarkerItem>
        <TimelineDividerItem last color="primary" width={200}>
          Hello world
        </TimelineDividerItem>
      </StraddledTimeline>,
    );

    expect(getAllByText('Hello world').length).toBe(3);
  });

  it('should accept the rest of the props', () => {
    render(
      <StraddledTimeline
        className="timeline"
        id="timeline"
        items={items}
        leftWidth={100}
        rightWidth={200}
        style={{ color: 'red' }}
        themeId="dark"
      />,
    );

    const timeline = document.getElementById('timeline');
    expect(timeline?.nodeName).toBe('DIV');
    expect(timeline?.style.getPropertyValue('color')).toBe('red');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <StraddledTimeline data-testid="timeline" items={items} leftWidth={100} ref={ref} rightWidth={200} />,
    );

    expect(getByTestId('timeline')).toBe(ref.current);
  });
});
