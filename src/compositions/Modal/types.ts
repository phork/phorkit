import React from 'react';

export type ModalItemType = {
  modal: React.ReactElement;
  options?: {
    onClose?: () => void;
  };
};
