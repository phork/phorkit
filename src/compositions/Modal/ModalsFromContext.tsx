import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { ModalConsumer } from './ModalConsumer';
import { ModalContainer, ModalContainerProps } from './ModalContainer';
import { ModalFromContext } from './ModalFromContext';

export type ModalsFromContextProps = Omit<ModalContainerProps, 'onEscape'> & ThemeProps;

export function ModalsFromContext({ themeId: initThemeId, ...props }: ModalsFromContextProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);

  return (
    <ModalConsumer>
      {({ modal, popModal }) => (
        <React.Fragment>
          {modal ? (
            <ModalContainer onEscape={popModal} {...props}>
              <ModalFromContext id={modal.props.id} key={modal.props.id} modal={modal} themeId={themeId} />
            </ModalContainer>
          ) : null}
        </React.Fragment>
      )}
    </ModalConsumer>
  );
}
