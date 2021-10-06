export type FontSizeConfig = {
  'font-size-2xsmall': string;
  'font-size-xsmall': string;
  'font-size-small': string;
  'font-size-medium': string;
  'font-size-large': string;
  'font-size-xlarge': string;
  'font-size-2xlarge': string;
  'font-size-3xlarge': string;
  'font-size-4xlarge': string;
  'font-size-5xlarge': string;
  'font-size-6xlarge': string;
  'font-size-7xlarge': string;
  'font-size-8xlarge': string;
};

export type ElementHeightConfig = {
  'element-height-2xsmall': string;
  'element-height-xsmall': string;
  'element-height-small': string;
  'element-height-medium': string;
  'element-height-large': string;
  'element-height-xlarge': string;
  'element-height-2xlarge': string;
  'element-height-3xlarge': string;
};

export type LayoutConfig = {
  'layout-grid-base': string;
};

export type LayoutZIndexConfig = {
  'layout-z-index-side-panel': number;
  'layout-z-index-stack-panel': number;
  'layout-z-index-global-header': number;
  'layout-z-index-loader': number;
  'layout-z-index-popover': number;
  'layout-z-index-modal': number;
  'layout-z-index-toast': number;
};

export type BorderRadiusConfig = {
  'border-radius-small': string;
  'border-radius-medium': string;
  'border-radius-large': string;
};

export type ScrollbarSizeConfig = {
  'scrollbar-small-width': string;
  'scrollbar-small-border-radius': number;
  'scrollbar-small-min-height': string;
  'scrollbar-small-offset': number;

  'scrollbar-xsmall-width': string;
  'scrollbar-xsmall-border-radius': number;
  'scrollbar-xsmall-min-height': string;
  'scrollbar-xsmall-offset': number;
};

type ViewportSizeConfig = {
  min: number;
  max: number;
};

export type ViewportConfig = {
  'viewport-2xsmall': Omit<ViewportSizeConfig, 'min'>;
  'viewport-xsmall': ViewportSizeConfig;
  'viewport-small': ViewportSizeConfig;
  'viewport-medium': ViewportSizeConfig;
  'viewport-large': ViewportSizeConfig;
  'viewport-xlarge': ViewportSizeConfig;
  'viewport-2xlarge': Omit<ViewportSizeConfig, 'max'>;
};

export type OpacityConfig = {
  'opacity-disabled': number;
  'opacity-quiet': number;
  'opacity-quieter': number;
  'opacity-quietest': number;
};

export type CommonConfig = FontSizeConfig &
  ElementHeightConfig &
  LayoutConfig &
  LayoutZIndexConfig &
  BorderRadiusConfig &
  ScrollbarSizeConfig &
  ViewportConfig &
  OpacityConfig;
