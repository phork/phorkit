import { cx } from '@emotion/css';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Orientation, AnyPosition, StackedPosition, ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useThemeId } from '../../context/Theme';
import { useComponentVisible } from '../../hooks/useComponentVisible';
import { useFocusReturn } from '../../hooks/useFocusReturn';
import { usePopoverPosition } from '../../hooks/usePopoverPosition';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
import { getFirstFocusableElement, isFocusWithin } from '../../utils/getFocusableElements';
import { getPositionOffset } from '../../utils/getPositionOffset';
import { renderFromProp, RenderFromPropElement } from '../../utils/renderFromProp';
import styles from './styles/Popover.module.css';
import { PopoverContentProps } from './types';
import { usePopoverComponentIds } from './usePopoverComponentIds';

const CLOSE_TIMEOUT_ID = 'close';

export type PopoverTogglerProps = {
  id: string;
  className?: string;
  onBlur: () => void;
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  onFocus: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onMouseEnter: () => void;
  tabIndex: 0;
  visible?: boolean;
};

export type PopoverRenderContentProps<C extends HTMLElement, F extends HTMLElement> = Pick<
  PopoverContentProps<C, F>,
  'close' | 'focusRef' | 'isTogglerFocused' | 'offset' | 'onMouseEnter' | 'position' | 'relativeRef' | 'visible'
> &
  Required<Pick<PopoverContentProps<C, F>, 'offset'>> & {
    'aria-hidden': boolean;
    focusable?: boolean;
    id: string;
    ref: (node: C | null) => void;
    role: 'tooltip' | 'dialog';
  };

export type PopoverProps<C extends HTMLElement, F extends HTMLElement> = Omit<ThemeProps, 'contrast' | 'unthemed'> & {
  className?: string;
  /** The number of milliseconds to delay before closing the popover */
  closeDelay?: number;
  /** If a popover is focusable it steals the focus away from its launcher and returns it on close */
  focusable?: boolean;
  /** Popovers are show own click by default unless hoverable is true */
  hoverable?: boolean;
  /** Normally clicking outside the popover will close it unless this is set */
  ignoreClickOutside?: boolean;
  /** The popover should be shown immediately and doesn't need an initial click/hover action */
  initialVisible?: boolean;
  /** If the popover is a tooltip it will have different aria props */
  isTooltip?: boolean;
  /** A layout orientation can be used to position the popup if a position isn't set */
  layout?: Orientation;
  offset?: {
    horizontal: number;
    vertical: number;
  };
  onClose?: () => void;
  onOpen?: () => void;
  /** Permanent popovers can't be closed */
  permanent?: boolean;
  position?: AnyPosition | StackedPosition;
  /** A function to render the actual popover and set its positioning */
  renderContent: (props: PopoverRenderContentProps<C, F>) => React.ReactNode;
  style?: React.CSSProperties;
  /** The element that's clicked or hovered to open and close the popover */
  toggler: RenderFromPropElement<PopoverTogglerProps>;
  /** If the toggler handles the focus styles this can be used to hide the standard focus outline */
  withoutTogglerFocusStyle?: boolean;
  /** Pass extra props to the toggler (can be used with ForwardProps) */
  withPopoverTogglerProps?: boolean;
};

/**
 * The popover component renders an element that is
 * used to toggle the popover from visible to hidden
 * as well as the `PopoverContent` itself which is
 * positioned relative to the toggle.
 *
 * A popover can be toggled via click (default) or
 * by hovering over the toggle if the hoverable prop
 * it set.
 *
 * @template C,F
 * @param {C} - The HTML element type of the contentRef
 * @param {F} - The HTML element type of the focusRef
 */
export function Popover<C extends HTMLElement, F extends HTMLElement>({
  className,
  closeDelay = 500,
  focusable = false,
  hoverable = false,
  ignoreClickOutside = false,
  initialVisible,
  isTooltip = false,
  layout = 'vertical',
  offset: initOffset = {
    horizontal: 0,
    vertical: 0,
  },
  onClose,
  onOpen,
  permanent = false,
  position: initPosition,
  renderContent,
  style,
  themeId: initThemeId,
  toggler,
  withoutTogglerFocusStyle = false,
  withPopoverTogglerProps = false,
  ...props
}: PopoverProps<C, F>): React.ReactElement<PopoverProps<C, F>> {
  const accessible = useAccessibility();
  const themeId = useThemeId(initThemeId);
  const { setSafeTimeout, clearSafeTimeout } = useSafeTimeout();
  const { changeFocus, returnFocus } = useFocusReturn();
  const [isTogglerFocused, setIsTogglerFocused] = useState<boolean>(false);
  const [hasContentRef, setHasContentRef] = useState<boolean>();
  const contentRef = useRef<C>(null!);
  const focusRef = useRef<F>(null!);
  const previous = useRef<{ isComponentVisible?: boolean; hasContentRef?: boolean }>({});
  const clickOutsideExclusions = useRef<HTMLElement[]>();

  // use the onHide callback rather than a useEffect listener so isFocusWithin runs before the popover is hidden
  const handleHide = useCallback(() => {
    focusable && isFocusWithin(contentRef.current) && returnFocus();
    onClose && onClose();
  }, [focusable, onClose, returnFocus]);

  const {
    ref: relativeRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible<HTMLDivElement>({
    ignoreClickOutside,
    initialVisible,
    onHide: handleHide,
    permanent,
    clickOutsideExclusions: clickOutsideExclusions.current,
    stopPropagation: true,
  });

  const position = usePopoverPosition(relativeRef, { position: initPosition, layout });
  const offset = useMemo(
    () => (position ? getPositionOffset(position, initOffset) : undefined),
    [position, initOffset],
  );
  const { componentId, generateTogglerId } = usePopoverComponentIds();

  // update the state to force a re-render when the content ref renders; exclude the content ref from triggering a close on click
  const setContentRef = useCallback((node: C | null) => {
    if (node !== null) {
      contentRef.current = node;

      if (!clickOutsideExclusions.current || clickOutsideExclusions.current?.[0] !== node) {
        clickOutsideExclusions.current = [node];
      }

      setHasContentRef(true);
    } else {
      setHasContentRef(false);
    }
  }, []);

  const cancelClose = () => {
    clearSafeTimeout(CLOSE_TIMEOUT_ID);
  };

  const closePopover = useCallback(
    (timeout?: number) => {
      if (!permanent) {
        if (timeout) {
          setSafeTimeout(
            () => {
              setIsComponentVisible(false);
            },
            timeout,
            CLOSE_TIMEOUT_ID,
          );
        } else {
          setIsComponentVisible(false);
        }
      }
    },
    [permanent, setIsComponentVisible, setSafeTimeout],
  );

  const openPopover = () => {
    cancelClose();
    setIsComponentVisible(true);
  };

  const togglePopover = () => {
    if (isComponentVisible) {
      closePopover();
    } else {
      openPopover();
    }
  };

  const handleClick: PopoverTogglerProps['onClick'] = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    !hoverable && togglePopover();
  };

  const handleMouseEnter: PopoverTogglerProps['onMouseEnter'] = () => {
    if (hoverable) {
      openPopover();
    }
  };

  const handleKeyDown: PopoverTogglerProps['onKeyDown'] = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      togglePopover();
    }
  };

  const handleTogglerBlur: PopoverTogglerProps['onBlur'] = useCallback(() => setIsTogglerFocused(false), []);
  const handleTogglerFocus: PopoverTogglerProps['onFocus'] = useCallback(() => setIsTogglerFocused(true), []);

  const renderToggler = () => {
    const togglerProps: PopoverTogglerProps = {
      id: generateTogglerId(),
      className: cx(
        styles.popoverToggler,
        !withoutTogglerFocusStyle && themeId && styles[`popoverToggler--${themeId}`],
        !withoutTogglerFocusStyle && accessible && styles['is-accessible'],
      ),
      onBlur: handleTogglerBlur,
      onClick: handleClick,
      onFocus: handleTogglerFocus,
      onKeyDown: handleKeyDown,
      onMouseEnter: handleMouseEnter,
      tabIndex: 0,
    };

    if (withPopoverTogglerProps) {
      togglerProps.visible = isComponentVisible;
    }

    return renderFromProp<PopoverTogglerProps>(toggler, togglerProps, { createFromString: true });
  };

  // change the focus if the visibility changes or when the contentRef value is set on initial render (needed for portals)
  useEffect(() => {
    if (
      previous.current.isComponentVisible !== isComponentVisible ||
      (!previous.current.hasContentRef && hasContentRef && isComponentVisible)
    ) {
      if (isComponentVisible && hasContentRef) {
        if (focusable) {
          if (focusRef.current) {
            changeFocus(focusRef.current);
          } else if (contentRef.current) {
            changeFocus(getFirstFocusableElement(contentRef.current));
          }
        }
        onOpen && onOpen();
      }
    }
    previous.current.isComponentVisible = isComponentVisible;
    previous.current.hasContentRef = hasContentRef;
  }, [changeFocus, focusable, isComponentVisible, onClose, onOpen, returnFocus, hasContentRef]);

  return (
    <div
      aria-describedby={isTooltip ? componentId : undefined}
      className={cx(styles.popoverContainer, className)}
      onMouseLeave={() => hoverable && closePopover(closeDelay)}
      ref={relativeRef}
      style={style}
      {...props}
    >
      {renderToggler()}
      {position &&
        offset &&
        renderContent({
          'aria-hidden': !isComponentVisible,
          close: closePopover,
          focusRef: focusable ? focusRef : undefined,
          id: componentId,
          isTogglerFocused,
          offset,
          onMouseEnter: cancelClose,
          position,
          ref: setContentRef,
          relativeRef,
          role: isTooltip ? 'tooltip' : 'dialog',
          visible: isComponentVisible,
        })}
    </div>
  );
}

Popover.displayName = 'Popover';
