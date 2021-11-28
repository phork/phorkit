import { UseAbsoluteCoordsProps } from '../../hooks/useAbsoluteCoords';
import { RenderFromPropElement } from '../../utils/renderFromProp';
import { PositionOffset } from './../../utils/getPositionOffset';

/**
 * @template C,F
 * @param {C} - The HTML element type of the contentRef
 * @param {F} - The HTML element type of the focusRef
 */
export type PopoverContentProps<C extends HTMLElement, F extends HTMLElement | undefined = undefined> = Pick<
  UseAbsoluteCoordsProps,
  'centered' | 'offset' | 'position'
> &
  React.HTMLAttributes<C> & {
    alwaysRender?: boolean;
    className?: string;
    close: (timeout?: number) => void;
    focusRef?: React.MutableRefObject<F>;
    height?: number;
    isTogglerFocused?: boolean;
    observe?: boolean;
    /** A relativeRef is used by portal popovers to position the popover relative to */
    relativeRef: React.MutableRefObject<HTMLDivElement>;
    visible?: boolean;
    width?: number | string;
  };

export type PopoverRenderChildrenProps<C extends HTMLElement, F extends HTMLElement | undefined = undefined> = Pick<
  PopoverContentProps<C, F>,
  'close' | 'focusRef' | 'isTogglerFocused' | 'position' | 'visible'
> & {
  focusable?: boolean;
  offset: PositionOffset;
};

export type PopoverContentPropsRenderChildren<C extends HTMLElement, F extends HTMLElement | undefined = undefined> = {
  children?: never;
  /** This can be used in place of the children in order to pass children props */
  renderChildren: RenderFromPropElement<PopoverRenderChildrenProps<C, F>>;
};

export type PopoverContentPropsChildren = {
  /** If there are children then `renderChildren` is ignored */
  children: React.ReactChild | React.ReactFragment;
  renderChildren?: never;
};

export type InlinePopoverContentHTMLElement = HTMLDivElement;
export type PortalPopoverContentHTMLElement = HTMLDivElement;
