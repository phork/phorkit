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

writeJson('./src/postcss/vars/mediaRules.json', {
  '--viewport-2xsmall-only': `(max-width: ${common['viewport-2xsmall'].max}px)`,
  '--viewport-xsmall-only': `(min-width: ${common['viewport-xsmall'].min}px) and (${common['viewport-xsmall'].max}px)`,
  '--viewport-small-only': `(min-width: ${common['viewport-small'].min}px) and (${common['viewport-small'].max}px)`,
  '--viewport-medium-only': `(min-width: ${common['viewport-medium'].min}px) and (${common['viewport-medium'].max}px)`,
  '--viewport-large-only': `(min-width: ${common['viewport-large'].min}px) and (${common['viewport-large'].max}px)`,
  '--viewport-xlarge-only': `(min-width: ${common['viewport-xlarge'].min}px) and (${common['viewport-xlarge'].max}px)`,
  '--viewport-2xlarge-only': `(min-width: ${common['viewport-2xlarge'].min}px)`,

  // --viewport-2xsmall-up is omitted because it would include everything
  '--viewport-xsmall-up': `(min-width: ${common['viewport-xsmall'].min}px)`,
  '--viewport-small-up': `(min-width: ${common['viewport-small'].min}px)`,
  '--viewport-medium-up': `(min-width: ${common['viewport-medium'].min}px)`,
  '--viewport-large-up': `(min-width: ${common['viewport-large'].min}px)`,
  '--viewport-xlarge-up': `(min-width: ${common['viewport-xlarge'].min}px)`,
  '--viewport-2xlarge-up': `(min-width: ${common['viewport-2xlarge'].min}px)`,

  '--viewport-2xsmall-down': `(max-width: ${common['viewport-xsmall'].max}px)`,
  '--viewport-xsmall-down': `(max-width: ${common['viewport-xsmall'].max}px)`,
  '--viewport-small-down': `(max-width: ${common['viewport-small'].max}px)`,
  '--viewport-medium-down': `(max-width: ${common['viewport-medium'].max}px)`,
  '--viewport-large-down': `(max-width: ${common['viewport-large'].max}px)`,
  '--viewport-xlarge-down': `(max-width: ${common['viewport-xlarge'].max}px)`,
  // --viewport-2xlarge-down is omitted because it would include everything
})
