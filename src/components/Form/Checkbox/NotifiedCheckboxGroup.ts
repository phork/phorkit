import { withNotification } from '../hoc/withNotification';
import { CheckboxGroup } from './CheckboxGroup';

export const NotifiedCheckboxGroup = withNotification(CheckboxGroup, {
  withDivider: true,
});
