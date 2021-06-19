import { SemanticColor } from '../../types';

export type ButtonAlignment = 'left' | 'right' | 'center';
export type ButtonWeight = 'solid' | 'shaded' | 'outlined' | 'ghost' | 'inline';
export type ButtonShape = 'pill' | 'brick';
export type ButtonSize = 'small' | 'medium' | 'large' | 'relative';
export type ButtonColor = SemanticColor | 'neutralAndPrimary' | 'black' | 'white';
export type ButtonElementType = Extract<keyof JSX.IntrinsicElements, 'button' | 'a' | 'div' | 'span'>;
