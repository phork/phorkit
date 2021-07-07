export type FormboxContainerElementType = Extract<keyof JSX.IntrinsicElements, 'label' | 'div'>;
export type FormboxIconPosition = 'before' | 'after';
export type FormboxInputElementType = Extract<keyof JSX.IntrinsicElements, 'input' | 'select' | 'textarea'>;
export type FormboxValue = string | number;
export type FormboxVariant = 'underline' | 'filled' | 'outline' | 'pill' | 'minimal';

export type FormboxSize =
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'xxxlarge'
  | 'xxxxlarge'
  | 'xxxxxlarge'
  | 'xxxxxxlarge'
  | 'xxxxxxxlarge';
