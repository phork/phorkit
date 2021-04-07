import { withNotification } from '../hoc/withNotification';
import { Select, SelectProps } from './Select';

export const NotifiedSelect = withNotification<SelectProps, HTMLSelectElement>(Select);
