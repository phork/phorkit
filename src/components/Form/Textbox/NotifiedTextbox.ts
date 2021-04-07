import { withNotification } from '../hoc/withNotification';
import { Textbox, TextboxProps } from './Textbox';

export const NotifiedTextbox = withNotification<TextboxProps, HTMLInputElement>(Textbox);
