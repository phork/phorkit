import { withNotification } from '../hoc/withNotification';
import { Toggle, ToggleProps } from './Toggle';

/**
 * The notified toggle is an extension of the `Toggle`
 * component with a status notification message
 * underneath it.
 */
export const NotifiedToggle = withNotification<ToggleProps, HTMLInputElement>(Toggle);
