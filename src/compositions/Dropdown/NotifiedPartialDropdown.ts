import { withNotification } from '../../components/Form/hoc/withNotification';
import { PartialDropdown, PartialDropdownHandles, PartialDropdownProps } from './PartialDropdown';

/**
 * The notified partial dropdown is an extension
 * of the `PartialDropdown` component with a status
 * notification message underneath it.
 */
export const NotifiedPartialDropdown = withNotification<PartialDropdownProps, PartialDropdownHandles>(
  PartialDropdown,
  undefined,
  {
    usingNotification: true,
  },
);
