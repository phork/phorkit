import React, { useCallback, useContext } from 'react';
import { ThemeProps } from '../../types';
import { ModalItemType } from './types';
import { useThemeId } from '../../hooks/useThemeId';
import { ModalContext } from './ModalContext';

export interface ModalFromContextProps extends ThemeProps {
  id: string;
  modal: ModalItemType['modal'];
}

export function ModalFromContext({ id, modal, themeId: initThemeId }: ModalFromContextProps) {
  const themeId = useThemeId(initThemeId);
  const { removeModal } = useContext(ModalContext);

  const handleClose = useCallback(() => {
    removeModal(id);
  }, [id, removeModal]);

  return React.cloneElement(modal, {
    themeId,
    onClose: handleClose,
  });
}