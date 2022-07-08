const config = require('../vars');

const mixins = {
  visuallyHidden: () => ({
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: '1px',
  }),

  allowMaximumFlexboxShrinkage: () => ({
    minHeight: 0,
    minWidth: 0,
    overflow: 'hidden',
  }),

  unbutton: (_mixin, minimal) => ({
    appearance: 'button',
    background: !minimal && 'transparent',
    border: !minimal && 'none',
    cursor: 'pointer',
    outline: 'none',
    textAlign: !minimal && 'left',

    '&:disabled': {
      cursor: 'not-allowed',
    },
  }),

  button: () => ({
    cursor: 'pointer',
    outline: 'none',

    '&:focus': {
      outline: 'none',
    },

    '&:disabled': {
      cursor: 'not-allowed',
    },
  }),

  unlist: () => ({
    listStyle: 'none',
    margin: 0,
    padding: 0,
  }),

  raisedShadow: (_mixin, theme, level = 0) => {
    const shadow = {
      boxShadow: config[`${theme}-box-shadow-${level}`],
      transition: 'box-shadow 200ms ease',
    };
    return shadow;
  },

  shadowBorder: (_mixin, color, width = '1px') => ({
    boxShadow: `${width} 0 0 0 ${color},
      0 ${width} 0 0 ${color},
      ${width} ${width} 0 0 ${color},
      ${width} 0 0 0 ${color} inset,
      0 ${width} 0 0 ${color} inset`,
  }),

  // x: ['left' | 'right'], y: ['top' | 'bottom']
  externalTabRadius: (_mixin, color, size = 4, y, x) => {
    const rotation = {
      'top-left': 180,
      'top-right': 90,
      'bottom-left': 270,
      'bottom-right': 0,
    }[[y, x].join('-')];

    return {
      [x]: `${-size}px`,
      [y]: 0,
      background: color,
      content: '""',
      height: `${size}px`,
      maskImage: `url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cpath d='M0 40L38.18 40C17.07 40 0 22.93 0 1.82L0 40Z' /%3E%3C/svg%3E);`,
      position: 'absolute',
      transform: `rotate(${rotation}deg)`,
      width: `${size}px`,
    };
  },
};

module.exports = mixins;
