#!/usr/bin/env node

'use strict'

const chalk = require('chalk')
const program = require('commander')
const pkg = require('../package.json')
const writeFileSyncRecursive = require('./utils/write-file');

program
  .version(pkg.version)
  .usage('[options]')
  .addOption(new program.Option('-t, --type <type>', 'type (component or composition)').choices(['component', 'composition']).default('component'))
  .requiredOption('-c, --component <component>', 'component name');

program.on('--help', function(){
  console.log('')
  console.log('Examples:');
  console.log('  $ scaffold-component-test --help');
  console.log('  $ scaffold-component-test -c Button');
  console.log('  $ scaffold-component-test -c Tooltip -t composition');
});

program.parse(process.argv);

const { component, type = 'component' } = program.opts();
const src = `./__tests__/${type}s/${component}/`;

if (typeof component === 'undefined') {
  console.log(chalk.red('Missing argument -c or --component. Try --help'))
  process.exit(1);
}

console.log(chalk.blue(`🤖 Generating ${src}...`))

const lcfirst = input => {
  return input.charAt(0).toLowerCase() + input.slice(1);
}

writeFileSyncRecursive(`${src}/${component}.test.tsx`, `
import { render } from '@testing-library/react';
import { ${component} } from 'lib';
import * as React from 'react';

describe('<${component} />', () => {
  it('should render a basic ${lcfirst(component)}', () => {
    const { getByText } = render(<${component}>Hello world</${component}>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});

`);

console.log(chalk.green(`🚀 Generated ${src}`));
