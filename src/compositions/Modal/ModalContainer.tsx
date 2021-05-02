import { cx } from '@emotion/css';
import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/ModalContainer.module.css';

export interface ModalContainerProps {
  children?: React.ReactNode;
  className?: string;
  onEscape: () => void;
}

export function ModalContainer({ children, className, onEscape }: ModalContainerProps): React.ReactPortal | null {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (onEscape && event.key === 'Escape') {
        event.stopPropagation();
        onEscape();
      }
    },
    [onEscape],
  );

  useEffect((): (() => void) => {
    typeof window !== 'undefined' && window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => typeof window !== 'undefined' && window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return typeof document !== 'undefined'
    ? ReactDOM.createPortal(<div className={cx(styles.modalContainer, className)}>{children}</div>, document.body)
    : null;
}

ModalContainer.displayName = 'ModalContainer';
