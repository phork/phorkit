import { SizeMapToAbbr } from 'config/constants';

export const textbox = ['underline', 'filled', 'outline', 'pill', 'minimal'] as const;
export const password = ['underline', 'filled', 'outline', 'minimal'] as const;
export const sizes = [
  'medium',
  'large',
  'xlarge',
  'xxlarge',
  'xxxlarge',
  'xxxxlarge',
  'xxxxxlarge',
  'xxxxxxlarge',
  'xxxxxxxlarge',
  'xxxxxxxxlarge',
] as const;

export const SizeMap = SizeMapToAbbr;
