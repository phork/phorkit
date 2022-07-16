#!/usr/bin/env node

'use strict'

const chalk = require('chalk');
const fs = require('fs');
const writeFileSyncRecursive = require('./utils/write-file')

const args = process.argv.slice(2);
const [filename, type] = args;

if (fs.existsSync(filename)) {
  console.log(chalk.green(`🤖 File ${filename} already exists`));
} else {
  const actualType = type ||  filename.split('.').pop();
  const content = (actualType === 'json' && '{}') || '';

  // write the file stub
  writeFileSyncRecursive(filename, content)
  console.log(chalk.green(`🚀 Generated ${filename}`));
}
