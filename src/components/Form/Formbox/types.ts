export type FormboxContainerElementType = Extract<keyof HTMLElementTagNameMap, 'label' | 'div'>;
export type FormboxIconPosition = 'before' | 'after';
export type FormboxInputElementType = Extract<keyof HTMLElementTagNameMap, 'input' | 'select' | 'textarea'>;
export type FormboxValue = string | number;
export type FormboxVariant = 'underline' | 'filled' | 'outline' | 'pill' | 'minimal';

export type FormboxSize =
  | 'medium'
  | 'large'
  | 'xlarge'
  | '2xlarge'
  | '3xlarge'
  | '4xlarge'
  | '5xlarge'
  | '6xlarge'
  | '7xlarge'
  | '8xlarge';
