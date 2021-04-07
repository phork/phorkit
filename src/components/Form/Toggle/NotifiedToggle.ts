import { withNotification } from '../hoc/withNotification';
import { Toggle, ToggleProps } from './Toggle';

export const NotifiedToggle = withNotification<ToggleProps, HTMLInputElement>(Toggle);
