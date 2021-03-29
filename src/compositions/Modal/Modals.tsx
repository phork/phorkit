import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { ModalConsumer } from './ModalConsumer';
import { ModalContainer, ModalContainerProps } from './ModalContainer';
import { ModalFromContext } from './ModalFromContext';
import { ModalProvider } from './ModalProvider';

export interface ModalsProps extends Omit<ModalContainerProps, 'onEscape'>, ThemeProps {
  children?: React.ReactNode;
}

export function Modals({ children, themeId: initThemeId, ...props }: ModalsProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);

  return (
    <ModalProvider {...props}>
      <ModalConsumer>
        {({ modal, popModal }) => (
          <React.Fragment>
            {children}
            {modal ? (
              <ModalContainer onEscape={popModal} {...props}>
                <ModalFromContext id={modal.props.id} key={modal.props.id} modal={modal} themeId={themeId} />
              </ModalContainer>
            ) : null}
          </React.Fragment>
        )}
      </ModalConsumer>
    </ModalProvider>
  );
}
