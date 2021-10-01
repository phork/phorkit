import { UseIconSizeProps } from '../hooks/useIconSize';
import { MergeProps } from './utils';

export type SvgIconProps = MergeProps<React.SVGProps<SVGSVGElement>, UseIconSizeProps> & {
  title?: string;
  titleId?: string;
};

export type Icon = (props: SvgIconProps) => React.ReactElement<SVGElement>;
