import { withNotification } from '../hoc/withNotification';
import { Password, PasswordProps } from './Password';

export const NotifiedPassword = withNotification<PasswordProps, HTMLInputElement>(Password);
