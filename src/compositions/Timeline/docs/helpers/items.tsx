import React from 'react';
import { Rhythm } from 'components/Rhythm';
import { TimelineMarkerItemProps } from '../../TimelineMarkerItem';

export const items = [
  {
    id: 'one',
    children: <Rhythm p={4}>Hello world</Rhythm>,
    color: 'primary' as TimelineMarkerItemProps['color'],
  },
  {
    id: 'two',
    children: <Rhythm p={4}>Hello world</Rhythm>,
    color: 'success' as TimelineMarkerItemProps['color'],
  },
  {
    id: 'three',
    children: <Rhythm p={4}>Hello world</Rhythm>,
    color: 'warning' as TimelineMarkerItemProps['color'],
  },
  {
    id: 'four',
    children: <Rhythm p={4}>Hello world</Rhythm>,
    color: 'danger' as TimelineMarkerItemProps['color'],
  },
];
