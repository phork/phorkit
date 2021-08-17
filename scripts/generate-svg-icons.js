#!/usr/bin/env node

'use strict'

const fs = require('fs')
const chalk = require('chalk')
const camelCase = require('camelcase')
const { default: svgr } = require('@svgr/core');
const writeFileSyncRecursive = require('./utils/write-file');
const template = require('./utils/svg-icon-template');

const generateIcon = ({ fileName, src, dst, level }) => {
  const componentName = camelCase(fileName.replace('.svg', ''), {pascalCase: true}) + 'Icon';
  const svgCode = fs.readFileSync(src, 'utf8');

  svgr(svgCode, {
    plugins: [
      '@svgr/plugin-svgo',
      '@svgr/plugin-jsx',
      '@svgr/plugin-prettier',
    ],
    titleProp: true,
    template
  }, { componentName }).then(jsCode => {
    writeFileSyncRecursive(`${dst}/${componentName}.tsx`, `${jsCode.replaceAll('../', '../'.repeat(level))}
${componentName}.displayName = '${componentName}';
    `);
  });

  return `export { ${componentName} } from './${componentName}';`
}

const generateIcons = ({ src, dst, type, level }) => {
  console.log(chalk.blue(`🤖 Generating ${type} SVG components...`));

  const fileNames = fs.readdirSync(src, 'utf8');
  const exports = fileNames.filter(src => /.*\.svg$/.test(src)).map(fileName => generateIcon({ fileName, src: `${src}/${fileName}`, dst, level }));
  exports.push('');

  writeFileSyncRecursive(`${dst}/index.ts`, exports.join('\n'));
  console.log(chalk.green(`🚀 Generated ${exports.length} ${type} icons`));
}

/**
 * This script generates the SVG components index files
 */
;(async () => {
  generateIcons({
    src: './public/icons',
    dst: './src/icons',
    type: 'bundled',
    level: 1,
  });

  generateIcons({
    src: './public/icons/internal',
    dst: './src/icons/internal',
    type: 'internal',
    level: 2,
  });
})()
