export type Theme = 'light' | 'dark';
export type IconScale = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | '2xlarge' | '3xlarge';

export type InvalidStateColor = 'warning' | 'danger';
export type StateColor = 'success' | InvalidStateColor;
export type SemanticColor = StateColor | 'neutral' | 'primary';
export type AccentColor = 'accent';

/** StackedPosition means the item is positioned on top of the trigger */
export type StackedPosition = 'stacked' | 'stacked-right';
export type CornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type VerticalPosition = 'top' | 'bottom';
export type VerticalPositionCentered = 'top-center' | 'bottom-center';
export type HorizontalPosition = 'left' | 'right';
export type HorizontalPositionCentered = 'left-center' | 'right-center';
export type HorizontalPositionEdge = 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';

export type SimplePosition = VerticalPosition | HorizontalPosition;

export type AnyPosition =
  | CornerPosition
  | VerticalPositionCentered
  | HorizontalPositionCentered
  | HorizontalPositionEdge;

export type Orientation = 'horizontal' | 'vertical';

export type SequentialVariant = 'primary' | 'secondary' | 'tertiary';

export type Volume = 'quiet' | 'quieter' | 'quietest';
