import React, { useCallback, useContext } from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { ModalProps } from './Modal';
import { ModalContext } from './ModalContext';

/* a modal in context is used with the modal system and requires a context id */
export type ModalWithContextItemType = React.ReactElement<Omit<ModalProps, 'contextId'> & { contextId: string }>;

export type ModalWithContextState = {
  modal: ModalWithContextItemType;
  options?: {
    onClose?: () => void;
  };
};

export interface ModalFromContextProps extends ThemeProps {
  contextId: string;
  modal: ModalWithContextItemType;
}

export function ModalFromContext({ contextId, modal, themeId: initThemeId }: ModalFromContextProps) {
  const themeId = useThemeId(initThemeId);
  const { removeModal } = useContext(ModalContext);

  const handleClose = useCallback(() => {
    removeModal(contextId);
  }, [contextId, removeModal]);

  return React.cloneElement(modal, {
    themeId,
    onClose: handleClose,
  });
}
