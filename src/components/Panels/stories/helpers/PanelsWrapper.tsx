import { Dispatch, SetStateAction, useState } from 'react';

export type PanelsWrapperProps = {
  children: (args: {
    isOpen: boolean;
    panelState: string;
    setPanelState: Dispatch<SetStateAction<string>>;
    toggleOpen: () => void;
  }) => React.ReactNode;
  isOpen?: boolean;
};

export function PanelsWrapper({ children, isOpen: initIsOpen = false }: PanelsWrapperProps): React.ReactNode {
  const [isOpen, setOpen] = useState<boolean>(initIsOpen);
  const [panelState, setPanelState] = useState<string>('default');

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return children({ isOpen, panelState, setPanelState, toggleOpen });
}
