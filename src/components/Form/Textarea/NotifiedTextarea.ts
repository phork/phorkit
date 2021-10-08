import { withNotification } from '../hoc/withNotification';
import { Textarea, TextareaProps } from './Textarea';

/**
 * The notified text area is an extension of the
 * `Textarea` component with a status notification
 * message underneath it.
 */
export const NotifiedTextarea = withNotification<TextareaProps, HTMLTextAreaElement>(Textarea);
