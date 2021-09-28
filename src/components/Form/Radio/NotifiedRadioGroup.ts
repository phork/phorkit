import { withNotification } from '../hoc/withNotification';
import { RadioGroup, RadioGroupProps } from './RadioGroup';

/**
 * The notified radio button group is an extension of
 * the RadioGroup component with a status notification
 * message underneath it.
 */
export const NotifiedRadioGroup = withNotification<RadioGroupProps, HTMLFieldSetElement>(RadioGroup, {
  withDivider: true,
});
