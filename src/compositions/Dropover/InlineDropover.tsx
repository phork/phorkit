import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { HorizontalPosition } from '../../types';
import { useThemeId } from '../../context/Theme';
import { renderFromProp, RenderFromPropElement, renderFromPropWithFallback } from '../../utils';
import { InlinePopover, InlinePopoverProps } from '../Popover/InlinePopover';
import { PopoverTogglerProps } from '../Popover/Popover';
import { InlinePopoverContentHTMLElement, PopoverRenderChildrenProps } from '../Popover/types';
import styles from './styles/Dropover.module.css';
import { DropoverLabelProps } from './DropoverLabel';

export type InlineDropoverProps<F extends HTMLElement | undefined = undefined> = Omit<
  InlinePopoverProps<F>,
  'centered' | 'layout' | 'position' | 'toggler' | 'withPopoverTogglerProps'
> & {
  align?: HorizontalPosition;
  width?: number;
  height?: number;
  label: RenderFromPropElement<object>;
};

export const defaultInlineOffset = {
  horizontal: -20,
  vertical: -12,
};

/**
 * A dropover is a popover that renders behind its toggle
 * so it looks like the toggle lives inside the dropover.
 *
 * This uses the `Popover` component.
 *
 * @template T,F
 * @param {T} - The HTML element type of the toggleRef
 * @param {F} - The HTML element type of the focusRef
 */
export function InlineDropover<T extends HTMLElement, F extends HTMLElement | undefined = undefined>({
  align = 'left',
  children,
  className,
  height,
  label,
  offset = defaultInlineOffset,
  renderChildren,
  themeId: initThemeId,
  width = 240,
  ...props
}: InlineDropoverProps<F>): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const toggleRef = useRef<T>(null);
  const isRightAligned = align === 'right';

  const renderToggler = useCallback(
    ({ visible, ...props }: PopoverTogglerProps) =>
      renderFromProp<Partial<DropoverLabelProps & { ref: React.RefObject<T> }>>(
        label,
        { ...props, ref: toggleRef },
        { createFromString: true },
      ),
    [label],
  );

  return (
    <InlinePopover<F>
      centered
      withPopoverTogglerProps
      className={cx(styles.dropover, themeId && styles[`dropover--${themeId}`], className)}
      height={height}
      offset={offset}
      position={isRightAligned ? 'stacked-right' : 'stacked'}
      renderChildren={({ close, focusRef, isTogglerFocused, offset, position, visible }) => {
        if (position !== 'stacked' && position !== 'stacked-right') {
          throw new Error('Invalid dropover position');
        }

        return (
          <React.Fragment>
            {renderChildren
              ? renderFromPropWithFallback<PopoverRenderChildrenProps<InlinePopoverContentHTMLElement, F>>(
                  renderChildren,
                  {
                    close,
                    focusRef,
                    isTogglerFocused,
                    offset,
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

InlineDropover.displayName = 'InlineDropover';
