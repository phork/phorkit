import produce from 'immer';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useBoundsObservable, UseBoundsObservableResponse } from '../../hooks/useBoundsObservable';
import { SizeContextValue, SizeContextType } from './SizeContext';

export type UseObserveSizeProps = {
  decimalPlaces?: number;
  /** Determines if the observer should be actively observing */
  observe?: boolean;
  /** The propsToMeasure array should be memoized */
  propsToMeasure?: Readonly<SizeContextType[]>;
};

export type UseObserveSizeResponse<E extends HTMLElement = HTMLDivElement> = {
  /** The ref to put on the element that should be measured */
  ref: React.MutableRefObject<E>;
  /** A function to manually measure the size and update the state */
  update: UseBoundsObservableResponse['update'];
  value: SizeContextValue;
};

const stripUnmeasuredProps = (
  size: SizeContextValue,
  propsToMeasure: NonNullable<UseObserveSizeProps['propsToMeasure']>,
): SizeContextValue => {
  return Object.keys(size).reduce((acc, key) => {
    if (propsToMeasure.includes(key as SizeContextType)) {
      acc[key as SizeContextType] = size[key as SizeContextType];
    }
    return acc;
  }, {} as SizeContextValue);
};

const defaultPropsToMeasure = ['width', 'height'] as SizeContextType[];

/**
 * The observe size hook accepts an array of size and/or
 * position props to measure and an observe flag that's
 * used to determine if the size should be constantly
 * monitored and returns a ref to attach to the element
 * that should be measured, the element's size values,
 * and a function that can be called manually to get the
 * new size and update the state.
 */
export function useObserveSize<E extends HTMLElement = HTMLDivElement>({
  decimalPlaces = 2,
  observe,
  propsToMeasure = defaultPropsToMeasure,
}: UseObserveSizeProps): UseObserveSizeResponse<E> {
  const previousValue = useRef<SizeContextValue>({} as SizeContextValue);
  const [size, setSize] = useState<SizeContextValue>({});
  const ref = useRef<E>(null!);

  // if this function changes it will start a new observer
  const processBounds = useCallback(
    (initBounds: DOMRect): void => {
      setSize(size => {
        const bounds = {
          bottom: Number(initBounds.bottom.toFixed(decimalPlaces)),
          height: Number(initBounds.height.toFixed(decimalPlaces)),
          left: Number(initBounds.left.toFixed(decimalPlaces)),
          right: Number(initBounds.right.toFixed(decimalPlaces)),
          top: Number(initBounds.top.toFixed(decimalPlaces)),
          width: Number(initBounds.width.toFixed(decimalPlaces)),
        };

        const measurablePropsHaveChanged = propsToMeasure.some(prop => size[prop] !== bounds[prop]);
        return measurablePropsHaveChanged ? stripUnmeasuredProps(bounds, propsToMeasure) : size;
      });
    },
    [decimalPlaces, propsToMeasure],
  );

  const { update } = useBoundsObservable({
    observe,
    processBounds,
    ref,
  });

  const value = produce(previousValue.current, draftState => {
    draftState.bottom = size.bottom;
    draftState.height = size.height;
    draftState.left = size.left;
    draftState.right = size.right;
    draftState.top = size.top;
    draftState.width = size.width;

    Object.keys(draftState).map(prop => {
      if (!propsToMeasure.includes(prop as SizeContextType)) {
        delete draftState[prop as SizeContextType];
      }
    });
  });
  previousValue.current = value;

  return useMemo(
    () => ({
      ref,
      update,
      value,
    }),
    [update, value],
  );
}
