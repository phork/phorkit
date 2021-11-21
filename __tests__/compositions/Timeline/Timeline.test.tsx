import { render } from '@testing-library/react';
import React from 'react';
import { Timeline, TimelineItemProps } from 'lib';

const items = [
  {
    id: 'one',
    children: <div>Hello world</div>,
    color: 'primary' as TimelineItemProps['color'],
  },
  {
    id: 'two',
    children: <div>Hello world</div>,
    color: 'success' as TimelineItemProps['color'],
  },
  {
    id: 'three',
    children: <div>Hello world</div>,
    color: 'warning' as TimelineItemProps['color'],
  },
  {
    id: 'four',
    children: <div>Hello world</div>,
    color: 'danger' as TimelineItemProps['color'],
  },
];

describe('<Timeline />', () => {
  it('should render', () => {
    const { queryAllByText } = render(<Timeline items={items}>Hello world</Timeline>);
    expect(queryAllByText('Hello world').length).toBe(4);
  });
});
