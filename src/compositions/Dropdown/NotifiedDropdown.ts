import { withNotification } from '../../components/Form/hoc/withNotification';
import { Dropdown, DropdownProps } from './Dropdown';
import { PartialDropdownHandles } from './PartialDropdown';

export const NotifiedDropdown = withNotification<DropdownProps, PartialDropdownHandles>(Dropdown, undefined, {
  usingNotification: true,
});
