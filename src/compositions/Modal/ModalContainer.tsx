import { cx } from '@emotion/css';
import React from 'react';
import ReactDOM from 'react-dom';
import { useHandleEscape } from '../../hooks/useHandleEscape';
import styles from './styles/ModalContainer.module.css';

export type ModalContainerProps = {
  children?: React.ReactNode;
  className?: string;
  onEscape: () => void;
};

/**
 * The modal container creates a portal attached to the
 * document body and renders the Modal child and a partially
 * transparent background mask in it. It also intercepts
 * any Escape keypress events and calls the onEscape callback.
 */
export function ModalContainer({ children, className, onEscape }: ModalContainerProps): React.ReactPortal | null {
  useHandleEscape({
    onEscape,
    stopPropagation: !!onEscape,
  });

  return typeof document !== 'undefined'
    ? ReactDOM.createPortal(<div className={cx(styles.modalContainer, className)}>{children}</div>, document.body)
    : null;
}

ModalContainer.displayName = 'ModalContainer';
