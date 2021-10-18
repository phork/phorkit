import React from 'react';
import { Looper } from 'components/Looper';
import { Rhythm } from 'components/Rhythm';

export const items = [
  {
    id: 'first',
    label: 'First',
    content: (
      <Rhythm px={5} py={2}>
        First panel
      </Rhythm>
    ),
  },
  {
    id: 'second',
    label: 'Second',
    content: (
      <Rhythm px={5} py={2}>
        Second panel
      </Rhythm>
    ),
  },
  {
    id: 'third',
    label: 'Third',
    content: (
      <Rhythm px={5} py={2}>
        Third panel
      </Rhythm>
    ),
  },
  {
    id: 'fourth',
    label: 'Fourth',
    content: (
      <Rhythm px={5} py={2} wrapper="div">
        <Looper end={40} render={() => <span>Fourth panel </span>} start={0} />
      </Rhythm>
    ),
  },
];
