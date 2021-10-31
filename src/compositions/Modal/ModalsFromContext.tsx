import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { ModalConsumer } from './ModalConsumer';
import { ModalContainer, ModalContainerProps } from './ModalContainer';
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
export function ModalsFromContext({ themeId: initThemeId, ...props }: ModalsFromContextProps): JSX.Element {
  const themeId = useThemeId(initThemeId);

  return (
    <ModalConsumer>
      {({ modal, popModal }) => (
        <React.Fragment>
          {modal ? (
            <ModalContainer onEscape={popModal} {...props}>
              <ModalFromContext key={modal.props.contextId} modal={modal} themeId={themeId} />
            </ModalContainer>
          ) : null}
        </React.Fragment>
      )}
    </ModalConsumer>
  );
}

ModalsFromContext.displayName = 'ModalsFromContext';
