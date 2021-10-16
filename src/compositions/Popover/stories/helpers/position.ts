import { StackedPosition, AnyPosition } from 'types/ui';

export const justifyContentByPosition = (position?: AnyPosition | StackedPosition) => {
  if (!position) return undefined;

  if (
    (
      ['top-left', 'bottom-left', 'left-top', 'left-center', 'left-bottom'] as Array<AnyPosition | StackedPosition>
    ).includes(position)
  ) {
    return 'flex-end';
  }
  if (
    (
      ['top-right', 'bottom-right', 'right-top', 'right-center', 'right-bottom'] as Array<AnyPosition | StackedPosition>
    ).includes(position)
  ) {
    return 'flex-start';
  }
  return 'center';
};

export const alignItemsByPosition = (position?: AnyPosition | StackedPosition) => {
  if (!position) return undefined;

  if (
    (
      ['top-left', 'top-center', 'top-right', 'left-bottom', 'right-bottom'] as Array<AnyPosition | StackedPosition>
    ).includes(position)
  ) {
    return 'flex-end';
  }
  if (
    (
      ['bottom-left', 'bottom-center', 'bottom-right', 'left-top', 'right-top'] as Array<AnyPosition | StackedPosition>
    ).includes(position)
  ) {
    return 'flex-start';
  }
  return 'center';
};
