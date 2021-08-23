import React, { cloneElement, Fragment } from 'react';

type NumericLooperProps = {
  end: number;
  start?: number;
  step?: number;
  render: (item: number) => React.ReactElement;
};

type ListLooperProps = {
  render: (item: string, i?: number) => React.ReactElement;
  list: Array<string>;
};

// to be used as a type guard
const isListLooper = (list: undefined | ListLooperProps['list']): list is ListLooperProps['list'] => {
  return list !== undefined && Array.isArray(list);
};

export function Looper(props: NumericLooperProps): React.ReactElement;

export function Looper(props: ListLooperProps): React.ReactElement;

export function Looper({ end: initEnd, list, render, start = 0, step = 1 }: any): React.ReactElement {
  const items = [];
  const end = list ? list.length - 1 : initEnd;

  for (let i = start; i <= end; i += step) {
    const element = isListLooper(list) ? render(list[i], i) : render(i);

    items.push(
      cloneElement(element, {
        key: element.key ?? (list ? list[i] : i),
      }),
    );
  }

  // eslint-disable-next-line react/jsx-fragments
  return <Fragment>{items}</Fragment>;
}

Looper.displayName = 'Looper';
