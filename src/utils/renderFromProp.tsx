import React from 'react';

export type RenderFromPropElement =
  | React.ReactElement
  | React.JSXElementConstructor<React.Attributes>
  | keyof JSX.IntrinsicElements;

export type RenderFromPropOptions = {
  children?: React.ReactChild;
  createFromString?: boolean;
};

export type RenderFromPropPropsType = JSX.IntrinsicAttributes & Record<string, unknown>;

export function renderFromProp<P extends RenderFromPropPropsType = RenderFromPropPropsType>(
  element: RenderFromPropElement | RenderFromPropElement[],
  props?: P,
  options: RenderFromPropOptions = {},
): React.ReactElement | null {
  if (Array.isArray(element)) {
    return <React.Fragment>{element.map((e, i) => renderFromProp(e, { key: i, ...props }, options))}</React.Fragment>;
  }

  const { children, createFromString } = options;

  if (typeof element === 'function') {
    const Element = element;
    if (children) {
      return <Element {...props}>{children}</Element>;
    }

    return <Element {...props} />;
  }

  if (typeof element === 'object' && React.isValidElement(element)) {
    if (children) {
      return React.cloneElement(element, props, children);
    }

    if (props) {
      return React.cloneElement(element, props);
    }

    return element;
  }

  if (typeof element === 'string' && createFromString) {
    if (children) {
      return React.createElement(element, props, children);
    }

    return React.createElement(element, props);
  }

  return null;
}

export function renderFromPropWithFallback<P extends RenderFromPropPropsType = RenderFromPropPropsType>(
  element: RenderFromPropElement | RenderFromPropElement[] | string,
  props?: P,
  options: RenderFromPropOptions = {},
): ReturnType<typeof renderFromProp> | string {
  if (typeof element === 'string') return element;
  return renderFromProp(element, props, options);
}
