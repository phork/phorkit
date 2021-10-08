import React, { useContext } from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { ModalProps } from './Modal';
import { ModalContext } from './ModalContext';

export type ModalWithContextItemType = React.ReactElement<
  Omit<ModalProps, 'contextId'> & {
    /* A modal with context is used with the modal system and requires a context id */
    contextId: string;
  }
>;

export type ModalFromContextProps = ThemeProps & {
  modal: ModalWithContextItemType;
};

/**
 * This accepts a `Modal` element and its ID and it
 * clones the modal and passes it an `onClose` prop
 * that can be used to the remove modal from the
 * state.
 */
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
