import { withNotification } from '../hoc/withNotification';
import { Select, SelectProps } from './Select';

/**
 * The notified select is an extension of the `Select`
 * component with a status notification message
 * underneath it.
 */
export const NotifiedSelect = withNotification<SelectProps, HTMLSelectElement>(Select);
