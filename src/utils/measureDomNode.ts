import { setStyleAttribute } from './setStyle';

export type EnhanceMeasurableNode = (node: HTMLElement) => HTMLElement;

export type ContainerSize = {
  containerHeight?: string;
  containerWidth?: string;
};

export type Measurements = {
  width: number;
  height: number;
};

/**
 * It's best if `appendTo` is set to the parent of
 * the element to be measured so that the font sizes
 * and other CSS attributes can be inherited.
 */
export const measureDomNode = (
  node: HTMLElement,
  enhanceMeasurableNode: EnhanceMeasurableNode,
  appendTo: HTMLElement | null,
  { containerHeight, containerWidth }: ContainerSize = {},
): Measurements | undefined => {
  if (!appendTo) return undefined;

  const container = document.createElement('div');
  setStyleAttribute(container, {
    display: 'inline-block',
    position: 'fixed',
    top: '0px',
    left: '0px',
    visibility: 'hidden',
    overflow: 'visible',
    pointerEvents: 'none',
    zIndex: '-1',
  });

  containerHeight && (container.style.height = containerHeight);
  containerWidth && (container.style.width = containerWidth);

  const clonedNode = node.cloneNode(true) as HTMLElement;
  const content = enhanceMeasurableNode(clonedNode);

  container.appendChild(content);
  appendTo.appendChild(container);

  const height = container.clientHeight;
  const width = container.clientWidth;

  container.parentNode?.removeChild(container);
  return { height, width };
};

export const enhanceVerticallyCollapsedDomNode =
  (props?: Record<string, string>): EnhanceMeasurableNode =>
  node => {
    setStyleAttribute(node, { ...props, height: 'auto' });
    return node;
  };

export const enhanceHorizontallyCollapsedDomNode =
  (props?: Record<string, string>): EnhanceMeasurableNode =>
  node => {
    setStyleAttribute(node, { ...props, width: 'auto' });
    return node;
  };
