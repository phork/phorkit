import { UseIconSizeInterface } from '../hooks/useIconSize';

export interface SvgIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'size' | 'scale'>, UseIconSizeInterface {
  title?: string;
  titleId?: string;
}

export type Icon = (props: SvgIconProps) => React.ReactElement<SVGElement>;
