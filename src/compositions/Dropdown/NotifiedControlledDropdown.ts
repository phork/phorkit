import { withNotification } from '../../components/Form/hoc/withNotification';
import { ControlledDropdown, ControlledDropdownProps } from './ControlledDropdown';
import { DropdownHandles } from './Dropdown';

export const NotifiedControlledDropdown = withNotification<ControlledDropdownProps, DropdownHandles>(
  ControlledDropdown,
  undefined,
  { usingNotification: true },
);
