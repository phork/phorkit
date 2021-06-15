import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { HorizontalPosition } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { renderFromProp, RenderFromPropElement, renderFromPropWithFallback } from '../../utils';
import { InlinePopover, InlinePopoverProps } from '../Popover/InlinePopover';
import { PopoverRenderChildrenProps } from '../Popover/types';
import styles from './styles/Dropover.module.css';

export interface InlineDropoverProps extends Omit<InlinePopoverProps, 'position' | 'toggler'> {
  align?: HorizontalPosition;
  width?: number;
  height?: number;
  label: RenderFromPropElement<any>;
  triangleSize?: number;
}

/** A dropover is a popover that looks like it contains the toggle */
export function InlineDropover({
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
  renderChildren,
  themeId: initThemeId,
  triangleSize = 4,
  width = 240,
  withChildrenProps,
  ...props
}: InlineDropoverProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const togglerRef = useRef();
  const isRightAligned = align === 'right';

  const renderToggler = useCallback(
    ({ visible, ...props }) => renderFromProp(label, { ...props, ref: togglerRef }, { createFromString: true }),
    [label],
  );

  return (
    <InlinePopover
      centered
      className={cx(styles.dropover, themeId && styles[`dropover--${themeId}`], className)}
      height={height}
      offset={offset}
      position={isRightAligned ? 'stacked-right' : 'stacked'}
      renderChildren={({ close, focusable, focusRef, isTogglerFocused, offset, position, visible }) => {
        if (position !== 'stacked' && position !== 'stacked-right') {
          throw new Error('Invalid dropover position');
        }

        return (
          <React.Fragment>
            {withChildrenProps
              ? renderFromPropWithFallback<PopoverRenderChildrenProps>(renderChildren!, {
                  close,
                  focusRef: focusable ? focusRef : undefined,
                  isTogglerFocused,
                  offset,
                  position,
                  visible,
                })
              : children}
          </React.Fragment>
        );
      }}
      toggler={renderToggler}
      width={width}
      withChildrenProps
      {...props}
    />
  );
}

InlineDropover.displayName = 'InlineDropover';
