import { cx } from '@emotion/css';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useHandleEscape, UseHandleEscapeProps } from '../../hooks/useHandleEscape';
import styles from './styles/ModalContainer.module.css';

export type ModalContainerProps = {
  children?: React.ReactChild | React.ReactFragment | null;
  className?: string;
  /** If this is provided it must return true in order for the modal to be closed */
  confirmClose?: UseHandleEscapeProps['confirm'];
  /** Don't add the standard semi-transparent background behind the modal */
  noBlackout?: boolean;
  /** The handler for the Escape key (usually to close the modal) */
  onEscape?: () => void;
  style?: React.CSSProperties;
};

/**
 * The modal container creates a portal attached to the
 * document body and renders the `Modal` child and a partially
 * transparent background mask in it. It also intercepts
 * any Escape `keydown` events and calls the `onEscape` callback.
 */
export function ModalContainer({
  children,
  className,
  confirmClose,
  noBlackout,
  onEscape,
}: ModalContainerProps): React.ReactPortal | null {
  const ref = useRef<HTMLDivElement>(null);

  useHandleEscape({
    confirm: confirmClose,
    onEscape,
    ref,
    stopPropagation: !!onEscape,
  });

  return typeof document !== 'undefined'
    ? ReactDOM.createPortal(
        <div
          className={cx(styles.modalContainer, noBlackout && styles['modalContainer--noBlackout'], className)}
          ref={ref}
        >
          {children}
        </div>,
        document.body,
      )
    : null;
}

ModalContainer.displayName = 'ModalContainer';
