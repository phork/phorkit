/**
 * This script compiles the PostCSS config into lib/config.json
 * for the published packages.
 */
const chalk = require('chalk')
const content = require('../src/postcss/vars/index.js');
const writeFileSyncRecursive = require('./utils/write-file');

writeFileSyncRecursive('./lib/config.json', JSON.stringify(content, null, 2))
console.log(chalk.green('🚀 Generated lib/config.json'));
