import React, { useState } from 'react';

export type StoryComponentDemoProps<V> = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement;
  /** The name of the event handler to add (eg. onChange) */
  eventHandlerName: string;
  initialValue?: V;
  /** Used to format the event handler value to that which will be set on the state */
  processValue?: (v: any) => V | undefined;
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
        [eventHandlerName]: (event: E, value: V) => {
          setValue(processValue ? processValue(value) : value);
          children.props[eventHandlerName]?.(event, value);
        },
      })}
    </div>
  );
}
