import { Offset } from '../../utils/getPositionOffset';
import { AnyPosition, Orientation } from './../../types/ui';

export const getTooltipOffset = ({
  cornerTriangle,
  position,
  layout,
}: {
  cornerTriangle?: boolean;
  position?: AnyPosition;
  layout?: Orientation;
}): Required<Offset> => {
  // vertical tooltips (eg. above or below trigger) centered
  if (position && ['top-center', 'bottom-center'].includes(position)) {
    return {
      horizontal: 0,
      vertical: 16,
    };
  }

  // vertical tooltips (eg. above or below trigger) to the left or right
  if (position && ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(position)) {
    return {
      horizontal: 30,
      vertical: 16,
    };
  }

  // horizontal tooltips (eg. left or right of trigger) centered
  if (position && ['left-center', 'right-center'].includes(position)) {
    return {
      horizontal: 16,
      vertical: 0,
    };
  }

  // horizontal tooltips (eg. left or right of trigger) to the left or right
  if (position && ['left-top', 'left-bottom', 'right-top', 'right-bottom'].includes(position)) {
    if (cornerTriangle) {
      return {
        horizontal: 20,
        vertical: 0,
      };
    }

    return {
      horizontal: 16,
      vertical: 20,
    };
  }

  // auto-positioned vertical tooltips
  if (!position && layout === 'vertical') {
    return {
      horizontal: 30,
      vertical: 16,
    };
  }

  // auto-positioned horizontal tooltips
  if (!position && layout === 'horizontal') {
    return {
      horizontal: 16,
      vertical: 20,
    };
  }

  return {
    horizontal: 0,
    vertical: 0,
  };
};
