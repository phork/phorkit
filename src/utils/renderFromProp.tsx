import React from 'react';
import * as ReactIs from 'react-is';

export type RenderFromFunctionElement<P> = React.JSXElementConstructor<P & { children?: React.ReactChild }>;
export type RenderFromElementElement<P> = React.ReactElement<P & { children?: React.ReactChild }>;
export type RenderFromStringElement = keyof JSX.IntrinsicElements;

export type RenderFromPropElement<P> =
  | RenderFromFunctionElement<P>
  | RenderFromElementElement<P>
  | RenderFromStringElement;

export type RenderFromPropOptions = {
  children?: React.ReactChild;
  createFromString?: boolean;
};

type RenderFromPropProps = JSX.IntrinsicAttributes & Record<string, unknown>;

export function isValidRenderElement<P extends RenderFromPropProps>(
  element: unknown,
): element is RenderFromPropElement<P> {
  return (
    typeof element === 'function' ||
    (typeof element === 'object' && React.isValidElement(element)) ||
    typeof element === 'string'
  );
}

export function renderFromFunction<P extends RenderFromPropProps>(
  element: RenderFromFunctionElement<P>,
  props?: P,
  { children }: RenderFromPropOptions = {},
): React.ReactElement | undefined {
  if (typeof element === 'function') {
    const Element = element;
    if (children) {
      return <Element {...(props as P)}>{children}</Element>;
    }

    return <Element {...(props as P)} />;
  }
  return undefined;
}

export function renderFromElement<P extends RenderFromPropProps>(
  element: RenderFromElementElement<P>,
  props?: P,
  { children }: RenderFromPropOptions = {},
): React.ReactElement | undefined {
  if (typeof element === 'object' && React.isValidElement(element)) {
    if (children) {
      return React.cloneElement(element, props, children);
    }

    if (props) {
      return React.cloneElement(element, props);
    }

    return element;
  }
  return undefined;
}

export function renderFromString<P extends RenderFromPropProps>(
  element: RenderFromStringElement,
  props?: P,
  { children, createFromString }: RenderFromPropOptions = {},
): React.ReactElement | undefined {
  if (typeof element === 'string' && createFromString) {
    if (children) {
      return React.createElement(element, props, children);
    }

    return React.createElement(element, props);
  }
  return undefined;
}

export function renderFromProp<P extends RenderFromPropProps>(
  element: RenderFromPropElement<P>,
  props?: P,
  options: RenderFromPropOptions = {},
): React.ReactElement | null {
  if (ReactIs.isFragment(element)) {
    if (isValidRenderElement<P>(element.props.children)) {
      return renderFromProp<P>(element.props.children, props, options);
    }
    return null;
  }

  // if there are multiple children render them normally, but wrap them in a fragment for type friendliness
  if (Array.isArray(element)) {
    return <React.Fragment>{element}</React.Fragment>;
  }

  return (
    (typeof element === 'function' && renderFromFunction<P>(element, props, options)) ||
    (typeof element === 'object' && React.isValidElement(element) && renderFromElement<P>(element, props, options)) ||
    (typeof element === 'string' && renderFromString<P>(element, props, options)) ||
    null
  );
}

export function renderFromPropArray<P extends RenderFromPropProps>(
  element: RenderFromPropElement<P> | RenderFromPropElement<P>[],
  props?: P,
  options: RenderFromPropOptions = {},
): ReturnType<typeof renderFromProp> | string {
  if (ReactIs.isFragment(element)) {
    if (isValidRenderElement<P>(element.props.children)) {
      return renderFromPropArray<P>(element.props.children, props, options);
    }
    return null;
  }

  if (Array.isArray(element)) {
    return (
      <React.Fragment>
        {element.map(child =>
          renderFromPropArray<P>(
            child,
            { key: (typeof child === 'object' && child.key) || undefined, ...(props as P) },
            options,
          ),
        )}
      </React.Fragment>
    );
  }

  return renderFromProp<P>(element, props, options);
}

export function renderFromPropWithFallback<P extends RenderFromPropProps>(
  element: RenderFromPropElement<P> | string,
  props?: P,
  options: RenderFromPropOptions = {},
): ReturnType<typeof renderFromProp> | string {
  if (typeof element === 'string') return element;

  if (ReactIs.isFragment(element)) {
    if (isValidRenderElement<P>(element.props.children)) {
      return renderFromPropWithFallback<P>(element.props.children, props, options);
    }
    return null;
  }

  return renderFromProp<P>(element, props, options);
}
