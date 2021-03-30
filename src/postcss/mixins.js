const postcss = require('postcss');
const config = require('./vars');

const recursiveRules = (nodes, rulesNode, handler) => {
  nodes.forEach(node => {
    if (node.type === 'decl') {
      const rule = handler(node, rulesNode);
      rulesNode.append({ prop: node.prop, value: rule });
    } else if (node.type === 'rule') {
      const rule = postcss.rule({ selector: node.selector });
      recursiveRules(node.nodes, rule, handler);
      rulesNode.append(rule);
    } else if (node.type === 'comment') {
      // ignore comments
    } else {
      throw new Error(`No motif handling implemented for ${node.type}`);
    }
  });
};

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

  // add an extra layer on top of the dark theme to lighten the background
  raisedShadow: (_mixin, theme, level = 0) => {
    const shadow = {
      boxShadow: config[`${theme}-box-shadow-${level}`],
      transition: 'box-shadow 200ms ease',
    };

    if (theme === 'dark') {
      const opacities = {
        0: 0.05,
        1: 0.08,
      };

      shadow.position = 'relative';
      shadow['&::before'] = {
        backgroundColor: '#fff',
        opacity: opacities[level],
        bottom: 0,
        content: '""',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        transition: 'opacity 300ms linear',
      };
    }

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

  addRhythm: (mixin, multiplier = 1, position = 'bottom', property = 'margin') => {
    const declaration = postcss.decl({
      prop: `${property}-${position}`,
      value: `calc($layout-grid-base * ${multiplier})`,
    });

    mixin.replaceWith(declaration);
  },

  addHorizontalRhythm: (mixin, multiplier = 1, property = 'margin') => {
    const declarations = [
      postcss.decl({
        prop: `${property}-left`,
        value: `calc($layout-grid-base * ${multiplier})`,
      }),
      postcss.decl({
        prop: `${property}-right`,
        value: `calc($layout-grid-base * ${multiplier})`,
      }),
    ];

    mixin.replaceWith(declarations);
  },

  addVerticalRhythm: (mixin, multiplier = 1, property = 'margin') => {
    const declarations = [
      postcss.decl({
        prop: `${property}-bottom`,
        value: `calc($layout-grid-base * ${multiplier})`,
      }),
      postcss.decl({
        prop: `${property}-top`,
        value: `calc($layout-grid-base * ${multiplier})`,
      }),
    ];

    mixin.replaceWith(declarations);
  },

  subtractRhythm: (mixin, multiplier = 1, position = 'bottom', property = 'margin') => {
    const declaration = postcss.decl({
      prop: `${property}-${position}`,
      value: `calc($layout-grid-base * calc(-1 * ${multiplier}))`,
    });

    mixin.replaceWith(declaration);
  },

  makeRhythm: (mixin, max) => {
    const rules = [];
    const getValue = i => `${i === 0 ? '0' : `calc($layout-grid-base * ${i})`} !important`;

    for (let i = 0; i <= max; i += 1) {
      ['margin', 'padding'].forEach(property => {
        ['top', 'bottom', 'left', 'right'].forEach(position => {
          const rule = postcss.parse(`.${property[0]}${position[0]}-${i} {}`).first;
          rule.append({ prop: `${property}-${position}`, value: getValue(i) });
          rules.push(rule);
        });

        let rule = postcss.parse(`.${property[0]}x-${i} {}`).first;
        rule.append({ prop: `${property}-left`, value: getValue(i) });
        rule.append({ prop: `${property}-right`, value: getValue(i) });
        rules.push(rule);

        rule = postcss.parse(`.${property[0]}y-${i} {}`).first;
        rule.append({ prop: `${property}-top`, value: getValue(i) });
        rule.append({ prop: `${property}-bottom`, value: getValue(i) });
        rules.push(rule);

        rule = postcss.parse(`.${property[0]}-${i} {}`).first;
        rule.append({ prop: property, value: getValue(i) });
        rules.push(rule);
      });
    }

    mixin.replaceWith(rules);
  },

  makeNegativeRhythm: (mixin, max) => {
    const rules = [];
    const getValue = i => `${i === 0 ? '0' : `calc($layout-grid-base * -${i})`} !important`;
    const property = 'margin';

    for (let i = 0; i <= max; i += 1) {
      ['top', 'bottom', 'left', 'right'].forEach(position => {
        const rule = postcss.parse(`.${property[0]}${position[0]}-neg-${i} {}`).first;
        rule.append({ prop: `${property}-${position}`, value: getValue(i) });
        rules.push(rule);
      });

      const rule = postcss.parse(`.${property[0]}-neg-${i} {}`).first;
      rule.append({ prop: property, value: getValue(i) });
      rules.push(rule);
    }

    mixin.replaceWith(rules);
  },

  themed: (mixin, prefix = '') => {
    const regex = /\$theme-[a-z0-9_-]+/gi;

    const rules = [];
    config.themes.forEach(theme => {
      const rule = postcss.rule({ selector: `&${prefix}--${theme}` });
      recursiveRules(mixin.nodes, rule, node => {
        if (regex.test(node.value)) {
          const themedValue = node.value.replace(regex, match => {
            const color = match.replace('$theme', theme);
            if (!config[color]) {
              throw new Error(`Invalid theme color ${match}`);
            }
            return config[color];
          });
          return themedValue;
        }
        return node.value;
      });
      rules.push(rule);
    });
    mixin.replaceWith(rules);
  },
};

module.exports = mixins;
