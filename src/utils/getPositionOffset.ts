import { AnyPosition, StackedPosition } from '../types';

export type Offset = { vertical?: number; horizontal?: number };
export type PositionOffset = { top?: number; right?: number; bottom?: number; left?: number };

export function getPositionOffset(position: AnyPosition | StackedPosition, offset: Offset): PositionOffset | undefined {
  switch (position) {
    case 'bottom-left':
      return {
        top: offset.vertical,
        right: offset.horizontal ? -1 * offset.horizontal : 0,
      };
    case 'bottom-center':
      return {
        top: offset.vertical,
      };
    case 'bottom-right':
      return {
        top: offset.vertical,
        left: offset.horizontal ? -1 * offset.horizontal : 0,
      };
    case 'top-left':
      return {
        bottom: offset.vertical,
        right: offset.horizontal ? -1 * offset.horizontal : 0,
      };
    case 'top-center':
      return {
        bottom: offset.vertical,
      };
    case 'top-right':
      return {
        bottom: offset.vertical,
        left: offset.horizontal ? -1 * offset.horizontal : 0,
      };
    case 'left-top':
    case 'left-center':
    case 'left-bottom':
      return {
        right: offset.horizontal,
      };
    case 'right-top':
    case 'right-center':
    case 'right-bottom':
      return {
        left: offset.horizontal,
      };
    case 'stacked':
      return {
        top: offset.vertical,
        left: offset.horizontal,
      };
    case 'stacked-right':
      return {
        top: offset.vertical,
        right: offset.horizontal,
      };
    default:
      return undefined;
  }
}
