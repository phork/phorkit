import { withNotification } from '../hoc/withNotification';
import { RadioGroup, RadioGroupProps } from './RadioGroup';

export const NotifiedRadioGroup = withNotification<RadioGroupProps, HTMLFieldSetElement>(RadioGroup, {
  withDivider: true,
});
