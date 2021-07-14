import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { HorizontalPosition } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { renderFromProp, RenderFromPropElement, renderFromPropWithFallback } from '../../utils';
import { PortalPopover, PortalPopoverProps } from '../Popover/PortalPopover';
import { PopoverContentProps, PopoverRenderChildrenProps } from '../Popover/types';
import styles from './styles/Dropover.module.css';

export interface PortalDropoverProps extends Omit<PortalPopoverProps, 'position' | 'toggler'> {
  align?: HorizontalPosition;
  width?: number;
  height?: number;
  label: RenderFromPropElement<any>;
  passiveLabel?: boolean;
  triangleSize?: number;
}

/** A dropover is a popover that looks like it contains the toggle */
export function PortalDropover({
  align,
  children,
  className,
  height,
  label,
  layout,
  offset = {
    horizontal: -20,
    vertical: -12,
  },
  /** A passive label doesn't allow re-clicking to close the dropover */
  passiveLabel = false,
  renderChildren,
  themeId: initThemeId,
  triangleSize = 4,
  width = 240,
  withChildrenProps,
  ...props
}: PortalDropoverProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const togglerRef = useRef();
  const isRightAligned = align === 'right';

  const renderToggler = useCallback(
    ({ visible, ...props }) => renderFromProp(label, { ...props, ref: togglerRef }, { createFromString: true }),
    [label],
  );

  // portal dropovers must re-draw the label on top of the dropover content
  const renderPortalToggler = (focused?: boolean) =>
    renderFromProp(label, { cloned: true, focused }, { createFromString: true });

  // the re-drawn portal label can close the portal again if it's not a passive label
  const getPortalTogglerInteractiveProps = (
    close: PopoverContentProps['close'],
  ):
    | {}
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
    <PortalPopover
      centered
      withChildrenProps
      className={cx(styles.dropover, themeId && styles[`dropover--${themeId}`], className)}
      height={height}
      offset={offset}
      position={isRightAligned ? 'stacked-right' : 'stacked'}
      renderChildren={({ close, focusable, focusRef, isTogglerFocused, offset: childrenOffset, position, visible }) => {
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
              style={{ top: -offset.vertical, [isRightAligned ? 'right' : 'left']: -offset.horizontal }}
              {...getPortalTogglerInteractiveProps(close)}
            >
              {renderPortalToggler(isTogglerFocused)}
            </div>

            {withChildrenProps
              ? renderFromPropWithFallback<PopoverRenderChildrenProps>(renderChildren!, {
                  close,
                  focusRef: focusable ? focusRef : undefined,
                  isTogglerFocused,
                  offset: childrenOffset,
                  position,
                  visible,
                })
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
