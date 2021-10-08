import { withNotification } from '../hoc/withNotification';
import { Textbox, TextboxProps } from './Textbox';

/**
 * The notified textbox is an extension of the `Textbox`
 * component with a status notification message underneath
 * it.
 */
export const NotifiedTextbox = withNotification<TextboxProps, HTMLInputElement>(Textbox);
