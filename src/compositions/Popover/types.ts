import { UseAbsoluteCoordsProps } from '../../hooks/useAbsoluteCoords';
import { RenderFromPropElement } from '../../utils/renderFromProp';
import { PositionOffset } from './../../utils/getPositionOffset';

/**
 * @template C,F
 * @param {C} - The HTML element type of the contentRef
 * @param {F} - The HTML element type of the focusRef
 */
export type PopoverContentProps<C extends HTMLElement, F extends HTMLElement> = Pick<
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

export type PopoverRenderChildrenProps<C extends HTMLElement, F extends HTMLElement> = Pick<
  PopoverContentProps<C, F>,
  'close' | 'focusRef' | 'isTogglerFocused' | 'position' | 'visible'
> & {
  focusable?: boolean;
  offset: PositionOffset;
};

/** If withChildrenProps is true then it we need a renderChildren function */
export type PopoverContentPropsRenderChildren<C extends HTMLElement, F extends HTMLElement> = {
  children?: never;
  /** The render function to use instead of the `children` prop */
  renderChildren: RenderFromPropElement<PopoverRenderChildrenProps<C, F>>;
  /** If this is true then the renderChildren function will be used instead of the `children` prop */
  withChildrenProps: true;
};

/** If withChildrenProps is not true then children should be a regular React node */
export type PopoverContentPropsChildren = {
  children: React.ReactNode;
  renderChildren?: never;
  withChildrenProps?: false;
};

export type InlinePopoverContentHTMLElement = HTMLDivElement;
export type PortalPopoverContentHTMLElement = HTMLDivElement;
