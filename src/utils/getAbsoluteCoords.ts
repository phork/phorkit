import { AnyPosition, StackedPosition } from '../types';

export type AbsoluteCoords = {
  position: 'fixed' | 'absolute';
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  transform?: string;
};

export type AbsoluteCoordsTranslations = {
  x?: string;
  y?: string;
};

export type GetAbsoluteCoordsProps = {
  /** The bounds rectangle of the source element */
  bounds: DOMRect;
  /** This will add translateX and translateY so the destination position will be centered */
  centered?: boolean;
  fixed?: boolean;
  /** The number of pixels to offset the destination position by */
  offset?: { top?: number; bottom?: number; left?: number; right?: number };
  /** The position of the result relative to the source element */
  position: AnyPosition | StackedPosition;
};

/**
 * This accept a bounds rectangle of a source element and
 * returns a CSS object that can be used to absolutely
 * position a destination element so that it appears to
 * be relative to the source element.
 */
export function getAbsoluteCoords({
  bounds,
  centered,
  fixed,
  offset,
  position,
}: GetAbsoluteCoordsProps): AbsoluteCoords {
  const { top, left, width, height } = bounds;
  const coords = {} as AbsoluteCoords;
  const translations = {} as AbsoluteCoordsTranslations;

  if (fixed) {
    coords.position = 'fixed';
    coords.top = 0;
    coords.left = 0;
  } else {
    coords.position = 'absolute';
    coords.top = window?.pageYOffset || document?.documentElement.scrollTop || document?.body.scrollTop;
    coords.left = window?.pageXOffset || document?.documentElement.scrollLeft || document?.body.scrollLeft;
  }

  switch (position) {
    case 'bottom-left':
      coords.top += top + height;
      coords.left += left + (centered ? width / 2 : width);
      translations.x = offset?.right ? `calc(-100% - ${offset?.right}px)` : '-100%';
      translations.y = offset?.top ? `${offset?.top}px` : undefined;
      break;

    case 'bottom-center':
      coords.top += top + height;
      coords.left += left;
      translations.x = `calc(-50% + ${width / 2}px)`;
      translations.y = offset?.top ? `${offset?.top}px` : undefined;
      break;

    case 'bottom-right':
      coords.top += top + height;
      coords.left += left + width;
      translations.x = offset?.left
        ? `calc(${(offset?.left || 0) - (centered ? width / 2 : width)}px)`
        : `-${centered ? width / 2 : width}px`;
      translations.y = offset?.top ? `${offset?.top}px` : undefined;
      break;

    case 'top-left':
      coords.top += top;
      coords.left += left + (centered ? width / 2 : width);
      translations.x = offset?.right ? `calc(-100% - ${offset?.right}px)` : '-100%';
      translations.y = offset?.bottom ? `calc(-100% - ${offset?.bottom}px)` : '-100%';
      break;

    case 'top-center':
      coords.top += top;
      coords.left += left;
      translations.x = `calc(-50% + ${width / 2}px)`;
      translations.y = offset?.bottom ? `calc(-100% - ${offset?.bottom}px)` : '-100%';
      break;

    case 'top-right':
      coords.top += top;
      coords.left += left + width;
      translations.x = offset?.left
        ? `calc(${(offset?.left || 0) - (centered ? width / 2 : width)}px)`
        : `-${centered ? width / 2 : width}px`;
      translations.y = offset?.bottom ? `calc(-100% - ${offset?.bottom}px)` : '-100%';
      break;

    case 'left-top':
      coords.top += top;
      coords.left += left;
      translations.x = offset?.right ? `calc(-100% - ${offset?.right}px)` : '-100%';
      translations.y = `${(offset?.top || 0) + (centered ? height / 2 : 0)}px`;
      break;

    case 'left-center':
      coords.top += top;
      coords.left += left;
      translations.x = offset?.right ? `calc(-100% - ${offset?.right}px)` : '-100%';
      translations.y = `calc(-50% + ${height / 2}px)`;
      break;

    case 'left-bottom':
      coords.top += top;
      coords.left += left;
      translations.x = offset?.right ? `calc(-100% - ${offset?.right}px)` : '-100%';
      translations.y = `calc(-100% - ${(offset?.bottom || 0) - (centered ? height / 2 : height)}px)`;
      break;

    case 'right-top':
      coords.top += top;
      coords.left += left;
      translations.x = offset?.left ? `${width + (offset?.left || 0)}px` : `${width}px`;
      translations.y = `${(offset?.top || 0) + (centered ? height / 2 : 0)}px`;
      break;

    case 'right-center':
      coords.top += top;
      coords.left += left;
      translations.x = offset?.left ? `calc(${width}px + ${offset?.left}px)` : `${width}px`;
      translations.y = `calc(-50% + ${height / 2}px)`;
      break;

    case 'right-bottom':
      coords.top += top;
      coords.left += left;
      translations.x = offset?.left ? `${width + (offset?.left || 0)}px` : `${width}px`;
      translations.y = `calc(-100% - ${(offset?.bottom || 0) - (centered ? height / 2 : height)}px)`;
      break;

    case 'stacked':
      coords.top += top;
      coords.left += left;
      translations.x = offset?.left ? `${offset?.left}px` : undefined;
      translations.y = offset?.top ? `${offset?.top}px` : undefined;
      break;

    case 'stacked-right':
      coords.top += top;
      coords.left += left;
      translations.x = offset?.right ? `calc(-100% - ${offset?.right}px + ${width}px)` : `calc(-100% + ${width}px)`;
      translations.y = offset?.top ? `${offset?.top}px` : undefined;
      break;

    default:
      break;
  }

  if (translations.x === '0px') delete translations.x;
  if (translations.y === '0px') delete translations.y;

  if (translations.x && translations.y) {
    coords.transform = `translate(${translations.x}, ${translations.y})`;
  } else if (translations.x) {
    coords.transform = `translateX(${translations.x})`;
  } else if (translations.y) {
    coords.transform = `translateY(${translations.y})`;
  }

  return coords;
}
