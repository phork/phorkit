import { Offset } from '../../utils/getPositionOffset';
import { AnyPosition, Orientation } from './../../types/ui';

export const getTooltipOffset = ({
  position,
  layout,
}: {
  position?: AnyPosition;
  layout?: Orientation;
}): Required<Offset> => {
  if (
    (position && ['bottom-left', 'bottom-right', 'top-left', 'top-right'].includes(position)) ||
    (!position && layout === 'vertical')
  ) {
    return {
      horizontal: 30,
      vertical: 16,
    };
  }

  return {
    horizontal: position && ['left-top', 'left-bottom', 'right-top', 'right-bottom'].includes(position) ? 20 : 16,
    vertical: 16,
  };
};
