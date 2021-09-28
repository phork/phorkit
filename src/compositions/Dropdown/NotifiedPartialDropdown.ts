import { withNotification } from '../../components/Form/hoc/withNotification';
import { PartialDropdown, PartialDropdownHandles, PartialDropdownProps } from './PartialDropdown';

export const NotifiedPartialDropdown = withNotification<PartialDropdownProps, PartialDropdownHandles>(
  PartialDropdown,
  undefined,
  {
    usingNotification: true,
  },
);
