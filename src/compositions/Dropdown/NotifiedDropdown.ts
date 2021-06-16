import { withNotification } from '../../components/Form/hoc/withNotification';
import { Dropdown, DropdownHandles, DropdownProps } from './Dropdown';

export const NotifiedDropdown = withNotification<DropdownProps, DropdownHandles>(Dropdown, undefined, {
  usingNotification: true,
});
