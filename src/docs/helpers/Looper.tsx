import React, { cloneElement, Fragment } from 'react';

export interface LooperProps {
  end: number;
  start: number;
  step: number;
  render: (item: string | number, i: number) => React.ReactElement;
  list?: Array<string | number>;
}

export function Looper({ end: initEnd, list, render, start = 0, step = 1 }: LooperProps) {
  const items = [];
  const end = list ? list.length - 1 : initEnd;

  for (let i = start; i <= end; i += step) {
    items.push(
      cloneElement(render(list ? list[i] : i, i), {
        key: list ? list[i] : i,
      }),
    );
  }

  // eslint-disable-next-line react/jsx-fragments
  return <Fragment>{items}</Fragment>;
}
