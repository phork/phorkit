import { withNotification } from '../hoc/withNotification';
import { Password, PasswordProps } from './Password';

/**
 * The notified password is an extension of the `Password`
 * component with a status notification message underneath it.
 */
export const NotifiedPassword = withNotification<PasswordProps, HTMLInputElement>(Password);
