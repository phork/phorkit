import { withNotification } from '../hoc/withNotification';
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup';

/**
 * The notified checkbox group is an extension of the
 * `CheckboxGroup` component with a status notification
 * message underneath it.
 */
export const NotifiedCheckboxGroup = withNotification<CheckboxGroupProps, HTMLFieldSetElement>(CheckboxGroup, {
  withDivider: true,
});
