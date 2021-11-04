import { withNotification } from '../hoc/withNotification';
import { StyledTextbox, StyledTextboxProps } from './StyledTextbox';

/**
 * The notified styled textbox is an extension of the
 * `StyledTextbox` component with a status notification
 * message underneath it.
 */
export const NotifiedStyledTextbox = withNotification<StyledTextboxProps, HTMLInputElement>(StyledTextbox);
