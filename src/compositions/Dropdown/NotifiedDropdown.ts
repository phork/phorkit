import { withNotification } from '../../components/Form/hoc/withNotification';
import { Dropdown, DropdownProps } from './Dropdown';
import { PartialDropdownHandles } from './PartialDropdown';

/**
 * The notified dropdown is an extension of the
 * `Dropdown` component with a status notification
 * message underneath it.
 */
export const NotifiedDropdown = withNotification<DropdownProps, PartialDropdownHandles>(Dropdown, undefined, {
  usingNotification: true,
});
