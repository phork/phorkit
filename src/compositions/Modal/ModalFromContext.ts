import React, { useCallback, useContext } from 'react';
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
  confirmClose?: () => Promise<boolean>;
  modal: ModalWithContextItemType;
};

/**
 * This accepts a `Modal` element and its ID and it
 * clones the modal and passes it an `onClose` prop
 * that can be used to remove the modal from the
 * state.
 */
export function ModalFromContext({ confirmClose, modal, themeId: initThemeId }: ModalFromContextProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const { removeModal } = useContext(ModalContext);
  const { contextId } = modal.props;

  const handleClose = useCallback(
    () =>
      confirmClose
        ? confirmClose().then(response => {
            if (response) {
              removeModal(contextId);
            }
          })
        : removeModal(contextId),
    [confirmClose, contextId, removeModal],
  );

  return React.cloneElement(modal, {
    themeId,
    onClose: handleClose,
  });
}
