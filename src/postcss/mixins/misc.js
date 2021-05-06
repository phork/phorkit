const postcss = require('postcss');
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
  }),

  button: () => ({
    cursor: 'pointer',
    outline: 'none',
    '&:focus': {
      outline: 'none',
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
      'top-left': -45,
      'top-right': -145,
      'bottom-left': 45,
      'bottom-right': 145,
    }[[y, x].join('-')];

    return {
      [x]: `${-size * 2.5}px`,
      [y]: `${-size}px`,
      background: 'transparent',
      borderColor: `transparent ${color} transparent transparent`,
      borderRadius: '100%',
      borderStyle: 'solid',
      borderWidth: `${size}px`,
      content: '""',
      height: `${size * 3.5}px`,
      position: 'absolute',
      transform: `rotate(${rotation}deg)`,
      width: `${size * 3.5}px`,
    };
  },
};

module.exports = mixins;
