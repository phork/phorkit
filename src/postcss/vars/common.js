const fontSizes = {
  'font-size-2xsmall': '9px',
  'font-size-xsmall': '10px',
  'font-size-small': '11px',
  'font-size-medium': '12px',
  'font-size-large': '13px',
  'font-size-xlarge': '14px',
  'font-size-2xlarge': '16px',
  'font-size-3xlarge': '18px',
  'font-size-4xlarge': '20px',
  'font-size-5xlarge': '24px',
  'font-size-6xlarge': '28px',
  'font-size-7xlarge': '32px',
  'font-size-8xlarge': '36px',
};

const elementSizes = {
  'element-height-2xsmall': '20px',
  'element-height-xsmall': '24px',
  'element-height-small': '28px',
  'element-height-medium': '32px',
  'element-height-large': '36px',
  'element-height-xlarge': '40px',
  'element-height-2xlarge': '44px',
  'element-height-3xlarge': '48px',
  'element-height-4xlarge': '54px',
  'element-height-5xlarge': '60px',
};

const layout = {
  'layout-grid-base': '4px',

  // anything that should show over the docz nav should be >= 1000
  'layout-z-index-side-panel': 500,
  'layout-z-index-stack-panel': 600,
  'layout-z-index-global-header': 700,
  'layout-z-index-loader': 800,
  'layout-z-index-popover': 1000,
  'layout-z-index-modal': 1100,
  'layout-z-index-toast': 1200,

  'border-radius-small': '2px',
  'border-radius-medium': '3px',
  'border-radius-large': '4px',

  'scrollbar-small-width': '4px',
  'scrollbar-small-border-radius': 0,
  'scrollbar-small-min-height': '32px',
  'scrollbar-small-offset': 0,

  'scrollbar-xsmall-width': '2px',
  'scrollbar-xsmall-border-radius': 0,
  'scrollbar-xsmall-min-height': '32px',
  'scrollbar-xsmall-offset': 0,
};

const viewports = {
  'viewport-2xsmall': { max: 414 },
  'viewport-xsmall': { min: 415, max: 575.999 },
  'viewport-small': { min: 576, max: 768.999 },
  'viewport-medium': { min: 769, max: 992.999 },
  'viewport-large': { min: 993, max: 1200.999 },
  'viewport-xlarge': { min: 1201, max: 1400.999 },
  'viewport-2xlarge': { min: 1401 },
};

const opacities = {
  'opacity-disabled': 0.5,
  'opacity-quiet': 0.5,
  'opacity-quieter': 0.4,
  'opacity-quietest': 0.3,
};

module.exports = {
  ...fontSizes,
  ...elementSizes,
  ...layout,
  ...viewports,
  ...opacities,
};
