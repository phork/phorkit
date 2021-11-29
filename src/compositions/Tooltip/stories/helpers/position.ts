import { Orientation, StackedPosition, AnyPosition } from 'types/ui';

export const getHorizontalPosition = (position?: AnyPosition | StackedPosition, layout?: Orientation) => {
  if (position) {
    if (
      (
        ['top-left', 'bottom-left', 'left-top', 'left-center', 'left-bottom'] as Array<AnyPosition | StackedPosition>
      ).includes(position)
    ) {
      return { right: 0 };
    }

    if (
      (
        ['top-right', 'bottom-right', 'right-top', 'right-center', 'right-bottom'] as Array<
          AnyPosition | StackedPosition
        >
      ).includes(position)
    ) {
      return { left: 0 };
    }
  } else {
    if (layout === 'horizontal') {
      return { left: 0 };
    }
  }

  return { left: '50%', transform: 'translateX(-50%)' };
};

export const getVerticalPosition = (position?: AnyPosition | StackedPosition, layout?: Orientation) => {
  if (position) {
    if (
      (
        ['top-left', 'top-center', 'top-right', 'left-bottom', 'right-bottom'] as Array<AnyPosition | StackedPosition>
      ).includes(position)
    ) {
      return { bottom: 0 };
    }
    if (
      (
        ['bottom-left', 'bottom-center', 'bottom-right', 'left-top', 'right-top'] as Array<
          AnyPosition | StackedPosition
        >
      ).includes(position)
    ) {
      return { top: 0 };
    }
  } else {
    if (layout === 'vertical') {
      return { bottom: 0 };
    }
  }

  return { top: '50%', transform: 'translateY(-50%)' };
};
