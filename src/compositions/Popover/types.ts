import { UseAbsoluteCoordsProps } from '../../hooks/useAbsoluteCoords';
import { RenderFromPropElement } from '../../utils/renderFromProp';
import { PositionOffset } from './../../utils/getPositionOffset';

export type PopoverRenderChildrenProps = Pick<
  PopoverContentProps,
  'close' | 'focusRef' | 'focusable' | 'isTogglerFocused' | 'position' | 'visible'
> & {
  offset: PositionOffset;
};

export type PopoverContentProps = Pick<UseAbsoluteCoordsProps, 'centered' | 'offset' | 'position'> &
  React.HTMLAttributes<HTMLDivElement> & {
    alwaysRender?: boolean;
    className?: string;
    close: (timeout?: number) => void;
    focusable?: boolean;
    focusRef?: React.MutableRefObject<HTMLElement>;
    height?: number;
    isTogglerFocused?: boolean;
    observe?: boolean;
    /** A relativeRef is used by portal popovers to position the popover relative to */
    relativeRef: React.MutableRefObject<HTMLDivElement>;
    visible?: boolean;
    width?: number | string;
  };

/** If withChildrenProps is true then it we need a renderChildren function */
export type PopoverContentPropsRenderChildren = {
  children?: never;
  renderChildren: RenderFromPropElement<PopoverRenderChildrenProps>;
  withChildrenProps: true;
};

/** If withChildrenProps is not true then children should be a regular React node */
export type PopoverContentPropsChildren = {
  children: React.ReactNode;
  renderChildren?: never;
  withChildrenProps?: false;
};
