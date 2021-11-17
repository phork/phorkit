const chalk = require('chalk')
const { scripts } = require('../package.json');

// if args are provided only the scripts matching ALL the args are output
const args = process.argv.slice(2)

Object.keys(scripts).forEach(cmd => {
  const matches = scripts[cmd].match("echo '(.*)' && exit 0");
  if (matches) {
    const script = cmd.replace('about-', '');
    if (!args.length || args.every(arg => script.match(arg))) {
      console.log(`${chalk.blue(script)}\n  ${matches[1]}`);
    }
  }
})