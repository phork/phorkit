import React, { useContext } from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { ModalContainer, ModalContainerProps } from './ModalContainer';
import { ModalContext } from './ModalContext';
import { ModalFromContext } from './ModalFromContext';

export type ModalsFromContextProps = Omit<ModalContainerProps, 'onEscape'> & Omit<ThemeProps, 'contrast' | 'unthemed'>;

/**
 * This consumes the modals from the `ModalProvider`
 * and displays the modal at the top of the stack
 * (eg. the last one added). When the Escape key
 * is pressed this removes the top modal from the
 * stack which will then either show the next modal
 * down or no modal at all.
 */
export function ModalsFromContext({
  confirmClose,
  themeId: initThemeId,
  ...props
}: ModalsFromContextProps): JSX.Element | null {
  const themeId = useThemeId(initThemeId);
  const { modal, popModal } = useContext(ModalContext);
  const isCurrentModalPermanent = modal?.props.permanent;

  return modal ? (
    <ModalContainer confirmClose={confirmClose} onEscape={isCurrentModalPermanent ? undefined : popModal} {...props}>
      <ModalFromContext confirmClose={confirmClose} key={modal.props.contextId} modal={modal} themeId={themeId} />
    </ModalContainer>
  ) : null;
}

ModalsFromContext.displayName = 'ModalsFromContext';
