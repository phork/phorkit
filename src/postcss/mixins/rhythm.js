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
};

module.exports = mixins;
