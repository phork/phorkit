import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { ThemeProps, HorizontalPosition } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { RenderFromPropElement, renderFromProp } from '../../utils/renderFromProp';
import { ForwardProps } from '../../components/ForwardProps';
import {
  InlinePopover,
  PopoverContentInlineProps,
  PopoverContentRenderChildrenProps,
  PopoverProps,
  PortalPopover,
} from '../Popover';
import styles from './styles/Dropover.module.css';

export interface DropoverProps
  extends Omit<
      PopoverProps,
      'children' | 'className' | 'content' | 'height' | 'offset' | 'position' | 'toggler' | 'width'
    >,
    ThemeProps {
  align?: HorizontalPosition;
  children: React.ReactNode;
  className?: string;
  component: typeof InlinePopover | typeof PortalPopover;
  contentProps?: Record<string, unknown>;
  height?: number;
  label: RenderFromPropElement | RenderFromPropElement[];
  offset?: {
    horizontal: number;
    vertical: number;
  };
  passiveLabel?: boolean;
  portal?: boolean;
  triangleSize?: number;
  width?: number;
}

export function Dropover({
  align,
  children,
  className,
  component: Component,
  contentProps,
  contrast,
  height,
  label,
  offset = {
    horizontal: -20,
    vertical: -12,
  },
  passiveLabel,
  portal,
  themeId: initThemeId,
  triangleSize = 4,
  width = 240,
  ...props
}: DropoverProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const togglerRef = useRef();
  const isRightAligned = align === 'right';

  const renderToggler = useCallback(
    ({ visible, ...props }) => renderFromProp(label, { ...props, ref: togglerRef }, { createFromString: true }),
    [label],
  );

  const renderPortalToggler = (focused?: boolean) =>
    portal && renderFromProp(label, { cloned: true, focused }, { createFromString: true });

  const getPortalLabelProps = (
    close: PopoverContentInlineProps['childrenProps']['close'],
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
    <Component
      className={cx(styles.dropover, themeId && styles[`dropover--${themeId}`], className)}
      contentProps={{ ...(contentProps || {}), withChildrenProps: true }}
      height={height}
      offset={offset}
      position={isRightAligned ? 'stacked-right' : 'stacked'}
      toggler={<ForwardProps<{ visible?: boolean }>>{props => renderToggler(props)}</ForwardProps>}
      width={width}
      {...props}
    >
      <ForwardProps<Pick<PopoverContentRenderChildrenProps, 'close' | 'togglerFocused'>>>
        {({ close, togglerFocused }): React.ReactElement => (
          <React.Fragment>
            {portal && (
              <div
                className={cx(
                  styles.dropoverContentLabel,
                  themeId && styles[`dropoverContentLabel--${themeId}`],
                  styles[`dropoverContentLabel--${isRightAligned ? 'right' : 'left'}`],
                )}
                style={{ top: -offset.vertical, [isRightAligned ? 'right' : 'left']: -offset.horizontal }}
                {...getPortalLabelProps(close)}
              >
                {renderPortalToggler(togglerFocused)}
              </div>
            )}
            {children}
          </React.Fragment>
        )}
      </ForwardProps>
    </Component>
  );
}
