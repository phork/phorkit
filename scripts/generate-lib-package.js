/**
 * This script creates lib/package.json for the published packages
 */
const chalk = require('chalk')
const pkg = require('../package.json')
const writeFileSyncRecursive = require('./utils/write-file');

const whitelist = [
  'description',
  'license',
  'name',
  'main',
  'modules',
  'peerDependencies',
  'private',
  'publishConfig',
  'sideEffects',
  'types',
  'version',
];

const content = Object.keys(pkg).reduce((acc, key) => {
  if (whitelist.includes(key)) {
    acc[key] = pkg[key];
  }
  return acc;
}, {});

content.dependencies = content.peerDependencies;
delete content.peerDependencies;

content.module = 'index.js';
content.sideEffects = typeof content.sideEffects === 'object' ?
  content.sideEffects.map(path => path.replace('src/', '')) :
  content.sideEffects;

writeFileSyncRecursive('./lib/package.json', JSON.stringify(content, null, 2))
console.log(chalk.green('🚀 Generated lib/package.json'));
