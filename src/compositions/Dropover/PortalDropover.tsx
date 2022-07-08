import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { HorizontalPosition } from '../../types';
import { useThemeId } from '../../context/Theme';
import { renderFromProp, RenderFromPropElement, renderFromPropWithFallback } from '../../utils';
import { PopoverTogglerProps } from '../Popover/Popover';
import { PortalPopover, PortalPopoverProps } from '../Popover/PortalPopover';
import { PopoverContentProps, PopoverRenderChildrenProps, PortalPopoverContentHTMLElement } from '../Popover/types';
import styles from './styles/Dropover.module.css';
import { DropoverLabelProps } from './DropoverLabel';

export type PortalDropoverProps<F extends HTMLElement | undefined = undefined> = Omit<
  PortalPopoverProps<F>,
  'centered' | 'layout' | 'portal' | 'position' | 'toggler' | 'withPopoverTogglerProps'
> & {
  align?: HorizontalPosition;
  width?: number;
  height?: number;
  label: RenderFromPropElement<object>;
  /** A passive label doesn't allow re-clicking to close the dropover */
  passiveLabel?: boolean;
};

export const defaultPortalOffset = {
  horizontal: -20,
  vertical: -12,
};

/**
 * A dropover is a popover that renders behind its toggle
 * so it looks like the toggle lives inside the dropover.
 * The portal dropover renders the popover in a portal.
 *
 * This uses the `Popover` component.
 *
 * @template T,F
 * @param {T} - The HTML element type of the toggleRef
 * @param {F} - The HTML element type of the focusRef
 */
export function PortalDropover<T extends HTMLElement, F extends HTMLElement | undefined = undefined>({
  align = 'left',
  children,
  className,
  height,
  label,
  offset = defaultPortalOffset,
  passiveLabel = false,
  renderChildren,
  themeId: initThemeId,
  width = 240,
  ...props
}: PortalDropoverProps<F>): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const toggleRef = useRef<T>(null);
  const isRightAligned = align === 'right';

  const renderToggler = useCallback(
    ({ className, visible, ...props }: PopoverTogglerProps) =>
      renderFromProp<Partial<DropoverLabelProps & { ref: React.RefObject<T> }>>(
        label,
        { ...props, className: cx(className, visible && styles['dropoverLabel--hidden']), ref: toggleRef },
        { createFromString: true },
      ),
    [label],
  );

  // portal dropovers must re-draw the label on top of the dropover content
  const renderClonedToggler = useCallback(
    (focused?: boolean) =>
      renderFromProp<{ cloned?: boolean; focused?: boolean }>(
        label,
        { cloned: true, focused },
        { createFromString: true },
      ),
    [label],
  );

  // the re-drawn portal label can close the portal again if it's not a passive label
  const getPortalTogglerInteractiveProps = (
    close: PopoverContentProps<PortalPopoverContentHTMLElement, F>['close'],
  ):
    | Record<string, unknown>
    | {
        onClick: React.MouseEventHandler;
        onKeyDown: React.KeyboardEventHandler;
        role: 'button';
        tabIndex: 0;
      } => {
    if (passiveLabel) return {};

    return {
      onClick: () => close && close(),
      onKeyDown: () => close && close(),
      role: 'button',
      tabIndex: 0,
    };
  };

  return (
    <PortalPopover<F>
      centered
      withPopoverTogglerProps
      className={cx(styles.dropover, themeId && styles[`dropover--${themeId}`], className)}
      height={height}
      offset={offset}
      portal="absolute"
      position={isRightAligned ? 'stacked-right' : 'stacked'}
      renderChildren={({ close, focusRef, isTogglerFocused, offset: childrenOffset, position, visible }) => {
        if (position !== 'stacked' && position !== 'stacked-right') {
          throw new Error('Invalid dropover position');
        }

        return (
          <React.Fragment>
            <div
              className={cx(
                styles.dropoverContentLabel,
                themeId && styles[`dropoverContentLabel--${themeId}`],
                styles[`dropoverContentLabel--${isRightAligned ? 'right' : 'left'}`],
              )}
              style={{
                top: (offset?.vertical || 0) * -1,
                [isRightAligned ? 'right' : 'left']: (offset?.horizontal || 0) * -1,
              }}
              {...getPortalTogglerInteractiveProps(close)}
            >
              {renderClonedToggler(isTogglerFocused)}
            </div>

            {renderChildren
              ? renderFromPropWithFallback<PopoverRenderChildrenProps<PortalPopoverContentHTMLElement, F>>(
                  renderChildren,
                  {
                    close,
                    focusRef,
                    isTogglerFocused,
                    offset: childrenOffset,
                    position,
                    visible,
                  },
                )
              : children}
          </React.Fragment>
        );
      }}
      toggler={renderToggler}
      width={width}
      {...props}
    />
  );
}

PortalDropover.displayName = 'PortalDropover';
