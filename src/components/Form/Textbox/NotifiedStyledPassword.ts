import { withNotification } from '../hoc/withNotification';
import { StyledPassword, StyledPasswordProps } from './StyledPassword';

/**
 * The notified styled password is an extension of the
 * `StyledPassword` component with a status notification
 * message underneath it.
 */
export const NotifiedStyledPassword = withNotification<StyledPasswordProps, HTMLInputElement>(StyledPassword);
