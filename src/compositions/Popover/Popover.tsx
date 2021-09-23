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

export type PopoverRenderContentProps = Pick<
  PopoverContentProps,
  | 'close'
  | 'focusable'
  | 'focusRef'
  | 'isTogglerFocused'
  | 'offset'
  | 'onMouseEnter'
  | 'parentRef'
  | 'position'
  | 'visible'
> &
  Required<Pick<PopoverContentProps, 'offset'>> & {
    'aria-hidden': boolean;
    id: string;
    ref: (node: HTMLElement | null) => void;
    role: 'tooltip' | 'dialog';
  };

export interface PopoverProps extends ThemeProps {
  className?: string;
  closeDelay?: number;
  focusable?: boolean;
  /** Popovers are show own click by default unless hoverable is true */
  hoverable?: boolean;
  ignoreClickOutside?: boolean;
  /** The popover should be shown immediately and doesn't need an initial click/hover action */
  initialVisible?: boolean;
  /** If the popover is a tooltip it will have different aria props */
  isTooltip?: boolean;
  /** An orientation can be used to position the popup if a position isn't set */
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
  renderContent: (props: PopoverRenderContentProps) => React.ReactNode;
  style?: React.CSSProperties;
  toggler: RenderFromPropElement<PopoverTogglerProps>;
  /** If the toggler handles the focus styles this can be used to hide the standard focus outline */
  withoutTogglerFocusStyle?: boolean;
  /** Pass extra props to the toggler (to be used with ForwardProps) */
  withPopoverTogglerProps?: boolean;
}

export function Popover({
  className,
  closeDelay = 500,
  focusable = false,
  hoverable = false,
  ignoreClickOutside = false,
  initialVisible,
  isTooltip = false,
  layout,
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
}: PopoverProps): React.ReactElement<PopoverProps> {
  const accessible = useAccessibility();
  const themeId = useThemeId(initThemeId);
  const { setSafeTimeout, clearSafeTimeout } = useSafeTimeout();
  const { changeFocus, returnFocus } = useFocusReturn();
  const [isTogglerFocused, setIsTogglerFocused] = useState<boolean>(false);
  const [hasContentRef, setHasContentRef] = useState<boolean>();
  const contentRef = useRef<HTMLElement>(null!);
  const focusRef = useRef<HTMLElement>(null!);
  const previous = useRef<{ isComponentVisible?: boolean; hasContentRef?: boolean }>({});
  const clickOutsideExclusions = useRef<HTMLElement[]>();

  const {
    ref: parentRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible<HTMLDivElement>({
    ignoreClickOutside,
    initialVisible,
    permanent,
    clickOutsideExclusions: clickOutsideExclusions.current,
    stopPropagation: true,
  });

  const position = usePopoverPosition(parentRef, { position: initPosition, layout });
  const offset = useMemo(
    () => (position ? getPositionOffset(position, initOffset) : undefined),
    [position, initOffset],
  );
  const { generatePopoverId, generateTogglerId } = usePopoverComponentIds();

  // update the state to force a re-render when the content ref renders; exclude the content ref from triggering a close on click
  const setContentRef = (node: HTMLElement | null) => {
    if (node !== null) {
      contentRef.current = node;

      if (!clickOutsideExclusions.current || clickOutsideExclusions.current?.[0] !== node) {
        clickOutsideExclusions.current = [node];
      }

      setHasContentRef(true);
    } else {
      setHasContentRef(false);
    }
  };

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

  // reset the focus if the visibility changes or when the contentRef value is set on initial render (needed for portals)
  useEffect(() => {
    if (
      previous.current.isComponentVisible !== isComponentVisible ||
      (!previous.current.hasContentRef && hasContentRef && isComponentVisible)
    ) {
      if (isComponentVisible) {
        if (hasContentRef) {
          if (focusable) {
            if (focusRef.current) {
              changeFocus(focusRef.current);
            } else if (contentRef.current) {
              changeFocus(getFirstFocusableElement(contentRef.current));
            }
          }
          onOpen && onOpen();
        }
      } else {
        focusable && isFocusWithin(contentRef.current) && returnFocus();
        onClose && onClose();
      }
    }
    previous.current.isComponentVisible = isComponentVisible;
    previous.current.hasContentRef = hasContentRef;
  }, [changeFocus, focusable, isComponentVisible, onClose, onOpen, returnFocus, hasContentRef]);

  return (
    <div
      aria-describedby={isTooltip ? generatePopoverId() : undefined}
      className={cx(styles.popoverContainer, className)}
      onMouseLeave={() => hoverable && closePopover(closeDelay)}
      ref={parentRef}
      style={style}
      {...props}
    >
      {renderToggler()}
      {position &&
        offset &&
        renderContent({
          'aria-hidden': !isComponentVisible,
          close: closePopover,
          focusable,
          focusRef,
          id: generatePopoverId(),
          isTogglerFocused,
          offset,
          onMouseEnter: cancelClose,
          parentRef,
          position,
          ref: setContentRef,
          role: isTooltip ? 'tooltip' : 'dialog',
          visible: isComponentVisible,
        })}
    </div>
  );
}

Popover.displayName = 'Popover';
