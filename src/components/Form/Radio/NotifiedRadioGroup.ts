import { withNotification } from '../hoc/withNotification';
import { RadioGroup } from './RadioGroup';

export const NotifiedRadioGroup = withNotification(RadioGroup, {
  withDivider: true,
});
