import React, { useContext } from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { ModalProps } from './Modal';
import { ModalContext } from './ModalContext';

/* a modal with context is used with the modal system and requires a context id */
export type ModalWithContextItemType = React.ReactElement<
  Omit<ModalProps, 'contextId'> & {
    contextId: string;
  }
>;

export interface ModalFromContextProps extends ThemeProps {
  modal: ModalWithContextItemType;
}

export function ModalFromContext({
  modal,
  themeId: initThemeId,
}: ModalFromContextProps): React.ReactElement<ModalProps> {
  const themeId = useThemeId(initThemeId);
  const { removeModal } = useContext(ModalContext);
  const { contextId } = modal.props;

  return React.cloneElement(modal, {
    themeId,
    onClose: () => removeModal(contextId),
  });
}
