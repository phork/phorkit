const chalk = require('chalk')
const { scripts } = require('../package.json');

Object.keys(scripts).forEach(cmd => {
  const matches = scripts[cmd].match("echo '(.*)' && exit 0");
  matches && console.log(`${chalk.blue(cmd.replace('about-', ''))}\n  ${matches[1]}`);
})