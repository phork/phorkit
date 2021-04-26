const postcss = require('postcss');

const mixins = {
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

  // the classes that style all 4 sides must go first so they can be overridden by more specific styles
  makeRhythm: (mixin, max) => {
    const rules = [];
    const getValue = i => `${i === 0 ? '0' : `calc($layout-grid-base * ${i})`} !important`;

    ['margin', 'padding'].forEach(property => {
      // eg. m-1, m-2, p-1, p-2, etc.
      for (let i = 0; i <= max; i += 1) {
        const rule = postcss.parse(`.${property[0]}-${i} {}`).first;
        rule.append({ prop: property, value: getValue(i) });
        rules.push(rule);
      }

      // eg. mx-1, mx-2, px-1, px-2, etc.
      for (let i = 0; i <= max; i += 1) {
        const rule = postcss.parse(`.${property[0]}x-${i} {}`).first;
        rule.append({ prop: `${property}-left`, value: getValue(i) });
        rule.append({ prop: `${property}-right`, value: getValue(i) });
        rules.push(rule);
      }

      // eg. my-1, my-2, py-1, py-2, etc.
      for (let i = 0; i <= max; i += 1) {
        const rule = postcss.parse(`.${property[0]}y-${i} {}`).first;
        rule.append({ prop: `${property}-top`, value: getValue(i) });
        rule.append({ prop: `${property}-bottom`, value: getValue(i) });
        rules.push(rule);
      }

      // eg. mt-1, mb-1, ml-1, mr-1, pt-1, pb-1, pl-1, pr-1, etc.
      for (let i = 0; i <= max; i += 1) {
        ['top', 'bottom', 'left', 'right'].forEach(position => {
          const rule = postcss.parse(`.${property[0]}${position[0]}-${i} {}`).first;
          rule.append({ prop: `${property}-${position}`, value: getValue(i) });
          rules.push(rule);
        });
      }
    });

    mixin.replaceWith(rules);
  },

  // the classes that style all 4 sides must go first so they can be overridden by more specific styles
  makeNegativeRhythm: (mixin, max) => {
    const rules = [];
    const getValue = i => `${i === 0 ? '0' : `calc($layout-grid-base * -${i})`} !important`;
    const property = 'margin';

    // eg. m-neg-1, m-neg-2, etc.
    for (let i = 0; i <= max; i += 1) {
      const rule = postcss.parse(`.${property[0]}-neg-${i} {}`).first;
      rule.append({ prop: property, value: getValue(i) });
      rules.push(rule);
    }

    // eg. mt-neg-1, mb-neg-1, ml-neg-1, mr-neg-1, etc.
    for (let i = 0; i <= max; i += 1) {
      ['top', 'bottom', 'left', 'right'].forEach(position => {
        const rule = postcss.parse(`.${property[0]}${position[0]}-neg-${i} {}`).first;
        rule.append({ prop: `${property}-${position}`, value: getValue(i) });
        rules.push(rule);
      });
    }

    mixin.replaceWith(rules);
  },
};

module.exports = mixins;
