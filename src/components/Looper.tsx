import React from 'react';

type NumericLooperProps = {
  end: number;
  start?: number;
  step?: number;
  render: (item: number) => React.ReactElement;
};

type ListLooperProps = {
  render: (item: string, i?: number) => React.ReactElement;
  list: readonly string[];
};

// to be used as a type guard
const isListLooper = (list: undefined | ListLooperProps['list']): list is ListLooperProps['list'] => {
  return list !== undefined && Array.isArray(list);
};

/** @example <Looper start={0} end={9} render={i => <div>{i}</div>} */
export function Looper(props: NumericLooperProps): React.ReactElement;

/** @example <Looper list={['small', 'medium', 'large']} render={size => <div>{size}</div>} */
export function Looper(props: ListLooperProps): React.ReactElement;

/**
 * A simple utility to loop through an array of
 * strings or to loop through a start and end value.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Looper({ end: initEnd, list, render, start = 0, step = 1 }: any): React.ReactElement {
  const items = [];
  const end = list ? list.length - 1 : initEnd;

  for (let i = start; i <= end; i += step) {
    const element = isListLooper(list) ? render(list[i], i) : render(i);

    items.push(
      React.cloneElement(element, {
        key: element.key ?? (list ? list[i] : i),
      }),
    );
  }

  return <React.Fragment>{items}</React.Fragment>;
}

Looper.displayName = 'Looper';
