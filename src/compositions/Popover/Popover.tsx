import { cx } from '@emotion/css';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Orientation, AnyPosition, StackedPosition } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useComponentVisible } from '../../hooks/useComponentVisible';
import { useFocusReturn } from '../../hooks/useFocusReturn';
import { usePopoverPosition } from '../../hooks/usePopoverPosition';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
import { getFirstFocusableElement } from '../../utils/getFocusableElements';
import { getPositionOffset } from '../../utils/getPositionOffset';
import { renderFromProp, RenderFromPropElement } from '../../utils/renderFromProp';
import { Portal } from '../../components/Portal';
import { PopoverContentInline, PopoverContentInlineProps } from './PopoverContentInline';
import styles from './styles/Popover.module.css';
import { usePopoverComponentIds } from './usePopoverComponentIds';

const CLOSE_TIMEOUT_ID = 'close';

type TogglerProps = {
  id: string;
  onBlur: () => void;
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  onFocus: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onMouseEnter: () => void;
  role: 'button';
  style: React.CSSProperties;
  tabIndex: 0;
  visible?: boolean;
};

export interface PopoverProps
  extends Pick<PopoverContentInlineProps, 'alwaysRender' | 'centered' | 'children' | 'focusable' | 'height' | 'width'> {
  className?: string;
  content: typeof PopoverContentInline | typeof Portal;
  contentProps?: Partial<
    Omit<
      PopoverContentInlineProps,
      | 'alwaysRender'
      | 'centered'
      | 'childrenProps'
      | 'className'
      | 'focusable'
      | 'focusRef'
      | 'height'
      | 'id'
      | 'offset'
      | 'onMouseEnter'
      | 'parentRef'
      | 'position'
      | 'ref'
      | 'role'
      | 'visible'
      | 'width'
    >
  >;
  hoverable?: boolean;
  ignoreClickOutside?: boolean;
  initialVisible?: boolean;
  layout?: Orientation;
  offset?: {
    horizontal: number;
    vertical: number;
  };
  onClose?: () => void;
  onOpen?: () => void;
  permanent?: boolean;
  popoverClassName?: string;
  position?: AnyPosition | StackedPosition;
  style?: React.CSSProperties;
  toggler: RenderFromPropElement;
  /** if the popover is a tooltip it will have different aria props */
  tooltip?: boolean;
  width?: number | string;
  /** pass extra props to the toggler (to be used with ForwardProps) */
  withTogglerProps?: boolean;
}

export function Popover({
  alwaysRender,
  centered,
  children,
  className,
  content: PopoverContent,
  contentProps = {},
  focusable,
  height,
  hoverable,
  ignoreClickOutside,
  initialVisible,
  layout,
  offset: initOffset = {
    horizontal: 0,
    vertical: 0,
  },
  onClose,
  onOpen,
  permanent,
  popoverClassName,
  position: initPosition,
  style,
  toggler,
  tooltip,
  width,
  withTogglerProps,
  ...props
}: PopoverProps): React.ReactElement<PopoverProps, 'div'> {
  const accessible = useAccessibility();
  const { setSafeTimeout, clearSafeTimeout } = useSafeTimeout();
  const { changeFocus, returnFocus } = useFocusReturn();
  const [togglerFocused, setTogglerFocused] = useState<boolean>(false);
  const [hasContentRef, setHasContentRef] = useState<boolean>();
  const contentRef = useRef<HTMLElement>(null!);
  const focusRef = useRef<HTMLElement>(null!);
  const previous = useRef<{ isComponentVisible?: boolean; hasContentRef?: boolean }>({});
  const clickOutsideExclusions = useRef<HTMLElement[]>();

  const { ref: parentRef, isComponentVisible, setIsComponentVisible } = useComponentVisible<HTMLDivElement>({
    ignoreClickOutside,
    initialVisible,
    permanent,
    clickOutsideExclusions: clickOutsideExclusions.current,
    stopPropagation: true,
  });

  const position = usePopoverPosition(parentRef, { position: initPosition, layout });
  const offset = useMemo(() => (position ? getPositionOffset(position, initOffset) : undefined), [
    position,
    initOffset,
  ]);
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

  const closePopover = (timeout?: number) => {
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
  };

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

  const handleClick: TogglerProps['onClick'] = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    !hoverable && togglePopover();
  };

  const handleMouseEnter: TogglerProps['onMouseEnter'] = () => {
    if (hoverable) {
      openPopover();
    }
  };

  const handleKeyDown: TogglerProps['onKeyDown'] = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      togglePopover();
    }
  };

  const handleTogglerBlur: TogglerProps['onBlur'] = useCallback(() => setTogglerFocused(false), []);
  const handleTogglerFocus: TogglerProps['onFocus'] = useCallback(() => setTogglerFocused(true), []);

  const renderToggler = () => {
    const togglerProps: TogglerProps = {
      id: generateTogglerId(),
      onBlur: handleTogglerBlur,
      onClick: handleClick,
      onFocus: handleTogglerFocus,
      onKeyDown: handleKeyDown,
      onMouseEnter: handleMouseEnter,
      role: 'button',
      style: {
        cursor: 'pointer',
        outline: !accessible ? 'none' : undefined,
        ...(typeof toggler === 'object' && toggler.props ? toggler.props.style : {}),
      } as React.CSSProperties,
      tabIndex: 0,
    };

    if (withTogglerProps) {
      togglerProps.visible = isComponentVisible;
    }

    return renderFromProp<TogglerProps>(toggler, togglerProps, { createFromString: true });
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
        focusable && returnFocus();
        onClose && onClose();
      }
    }
    previous.current.isComponentVisible = isComponentVisible;
    previous.current.hasContentRef = hasContentRef;
  }, [changeFocus, focusable, isComponentVisible, onClose, onOpen, returnFocus, hasContentRef]);

  return (
    <div
      aria-describedby={tooltip ? generatePopoverId() : undefined}
      className={cx(styles.popoverContainer, className)}
      onMouseLeave={() => hoverable && closePopover(500)}
      ref={parentRef}
      style={style}
      {...props}
    >
      {renderToggler()}

      {position && offset && (
        <PopoverContent
          alwaysRender={alwaysRender}
          aria-hidden={!isComponentVisible}
          centered={centered}
          childrenProps={{
            close: closePopover,
            togglerFocused,
            visible: isComponentVisible,
          }}
          className={popoverClassName}
          focusable={focusable}
          focusRef={focusRef}
          height={height}
          id={generatePopoverId()}
          offset={offset}
          onMouseEnter={cancelClose}
          parentRef={parentRef}
          position={position}
          ref={setContentRef}
          role={tooltip ? 'tooltip' : 'dialog'}
          visible={isComponentVisible}
          width={width}
          {...contentProps}
        >
          {children}
        </PopoverContent>
      )}
    </div>
  );
}

Popover.displayName = 'Popover';
