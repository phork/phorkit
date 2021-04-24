/**
 * This script compiles the PostCSS config into JSON files
 */
const chalk = require('chalk')
const common = require('../src/postcss/vars/common.js');
const darkTheme = require('../src/postcss/vars/darkTheme.js');
const lightTheme = require('../src/postcss/vars/lightTheme.js');
const writeFileSyncRecursive = require('./utils/write-file');

const writeJson = (filename, content) => {
  writeFileSyncRecursive(filename, JSON.stringify(content, null, 2));
  console.log(chalk.green(`🚀 Generated ${filename}`));
}

writeJson('./src/postcss/vars/common.json', common)
writeJson('./src/postcss/vars/darkTheme.json', darkTheme)
writeJson('./src/postcss/vars/lightTheme.json', lightTheme)
