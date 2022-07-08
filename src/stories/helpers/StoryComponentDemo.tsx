/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

export type StoryComponentDemoProps<V> = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement;
  /** The name of the event handler to add (eg. onChange) */
  eventHandlerName: string;
  initialValue?: V;
  /** Used to format the event handler value to that which will be set on the state */
  processValue?: (newValue: any, currentValue: V | undefined) => V | undefined;
  /** The name of the value prop to pass to the child (eg. page, count, value) */
  valuePropName: string;
};

/**
 * This clones the children element and adds to it a value
 * and an event handler that updates that value.
 */
export function StoryComponentDemo<V, E extends (...args: any[]) => void>({
  children,
  eventHandlerName,
  initialValue,
  processValue,
  valuePropName,
  ...props
}: StoryComponentDemoProps<V>) {
  const [value, setValue] = useState<V | undefined>(initialValue);

  return (
    <div {...props}>
      {React.cloneElement(children, {
        [valuePropName]: value,
        [eventHandlerName]: (event: E, newValue: any) => {
          setValue(processValue ? processValue(newValue, value) : newValue);
          children.props[eventHandlerName]?.(event, newValue);
        },
      })}
    </div>
  );
}
