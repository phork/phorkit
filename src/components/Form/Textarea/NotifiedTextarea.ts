import { withNotification } from '../hoc/withNotification';
import { Textarea, TextareaProps } from './Textarea';

export const NotifiedTextarea = withNotification<TextareaProps, HTMLTextAreaElement>(Textarea);
