import React from 'react';
import { Rhythm } from 'components/Rhythm';
import { TimelineItemProps } from '../../TimelineItem';

export const items = [
  {
    id: 'one',
    children: <Rhythm p={4}>Hello world</Rhythm>,
    color: 'primary' as TimelineItemProps['color'],
  },
  {
    id: 'two',
    children: <Rhythm p={4}>Hello world</Rhythm>,
    color: 'success' as TimelineItemProps['color'],
  },
  {
    id: 'three',
    children: <Rhythm p={4}>Hello world</Rhythm>,
    color: 'warning' as TimelineItemProps['color'],
  },
  {
    id: 'four',
    children: <Rhythm p={4}>Hello world</Rhythm>,
    color: 'danger' as TimelineItemProps['color'],
  },
];
