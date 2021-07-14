import React, { useCallback, useContext } from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { ModalContext } from './ModalContext';
import { ModalItemType } from './types';

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
