import { withNotification } from '../hoc/withNotification';
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup';

export const NotifiedCheckboxGroup = withNotification<CheckboxGroupProps, HTMLFieldSetElement>(CheckboxGroup, {
  withDivider: true,
});
