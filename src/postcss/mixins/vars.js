const postcss = require('postcss');
const common = require('../vars/common');
const vars = require('../vars/index');

const mixins = {
  makeColors: mixin => {
    const rules = [];

    Object.keys(vars)
      .filter(key => key.match(/^([a-z]+-color-(FG[0-9]+|P[0-9]+|[a-z]+)).*/))
      .forEach(key => {
        const rule = postcss.parse(`.${key} {}`).first;
        rule.append({ prop: 'color', value: vars[key] });
        rules.push(rule);
      });

    const rule = postcss.parse(`.color-transparent {}`).first;
    rule.append({ prop: 'color', value: 'transparent' });
    rules.push(rule);

    mixin.replaceWith(rules);
  },

  makeBackgroundColors: mixin => {
    const rules = [];

    Object.keys(vars)
      .filter(key => key.match(/^([a-z]+-color-(BG[0-9]+|P[0-9]+|[a-z]+)).*/))
      .filter(key => !key.match(/-contrast$/))
      .forEach(key => {
        const rule = postcss.parse(`.${key.replace('color-', 'background-color-')} {}`).first;
        rule.append({ prop: 'background-color', value: vars[key] });
        rules.push(rule);
      });

    const rule = postcss.parse(`.background-color-transparent {}`).first;
    rule.append({ prop: 'background-color', value: 'transparent' });
    rules.push(rule);

    mixin.replaceWith(rules);
  },

  makeBoxShadows: mixin => {
    const rules = [];

    Object.keys(vars)
      .filter(key => key.match(/^([a-z]+-box-shadow).*/))
      .forEach(key => {
        const rule = postcss.parse(`.${key} {}`).first;
        rule.append({ prop: 'box-shadow', value: vars[key] });
        rules.push(rule);
      });

    const rule = postcss.parse(`.box-shadow-none {}`).first;
    rule.append({ prop: 'box-shadow', value: 'none' });
    rules.push(rule);

    mixin.replaceWith(rules);
  },

  makeFontSizes: mixin => {
    const rules = [];

    Object.keys(common)
      .filter(key => key.startsWith('font-size'))
      .forEach(key => {
        const rule = postcss.parse(`.${key} {}`).first;
        rule.append({ prop: 'font-size', value: common[key] });
        rules.push(rule);
      });

    mixin.replaceWith(rules);
  },

  makeBorderRadius: mixin => {
    const rules = [];

    Object.keys(common)
      .filter(key => key.startsWith('border-radius'))
      .forEach(key => {
        const rule = postcss.parse(`.${key} {}`).first;
        rule.append({ prop: 'border-radius', value: common[key] });
        rules.push(rule);
      });

    const rule = postcss.parse(`.border-radius-none {}`).first;
    rule.append({ prop: 'border-radius', value: '0' });
    rules.push(rule);

    mixin.replaceWith(rules);
  },
};

module.exports = mixins;
