const postcss = require('postcss');
const config = require('../vars');

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
