#!/usr/bin/env node

'use strict'

const chalk = require('chalk')
const program = require('commander')
const pkg = require('../package.json')
const writeFileSyncRecursive = require('./utils/write-file');

program
  .version(pkg.version)
  .usage('[options] <file ...>')
  .option('-t, --type <type>', 'Type', /^(component|composition)$/i, 'component')
  .option('-c, --component <component>', 'Component name', /^([A-Z][a-z]+)+$/)

program.on('--help', function(){
  console.log('')
  console.log('Examples:');
  console.log('  $ scaffold-component --help');
  console.log('  $ scaffold-component -c Button');
  console.log('  $ scaffold-component -c Tooltip -t composition');
});
  
program.parse(process.argv);

const { component, type = 'component' } = program;
const src = `./src/${type}s/${component}/`;

if (typeof component === 'undefined') {
  console.log(chalk.red('Missing argument -c or --component. Try --help'))
  process.exit(1);
}

console.log(chalk.blue(`🤖 Generating ${src}...`))

const lcfirst = input => {
  return input.charAt(0).toLowerCase() + input.slice(1);
}

const ucfirst = input => {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

writeFileSyncRecursive(`${src}/${component}.tsx`, `
import React from 'react';
import { cx } from '@emotion/css';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/${component}.module.css';

export interface ${component}Props extends ThemeProps {
  children: React.ReactNode
}

export function ${component}({ children, themeId: initThemeId }: ${component}Props): React.ReactElement {
  const themeId = useThemeId(initThemeId);

  return (
    <div 
      className={cx(
        styles.${lcfirst(component)},
        themeId && styles[\`${lcfirst(component)}--\${themeId}\`],
      )}
    >
      {children}
    </div>
  );
}
`);

writeFileSyncRecursive(`${src}/index.ts`, `
export { ${component} } from './${component}';
`);

writeFileSyncRecursive(`${src}/styles/${component}.module.css`, `
.${lcfirst(component)} {
}
`);

writeFileSyncRecursive(`${src}/docs/${lcfirst(component)}.mdx`, `
---
name: ${component}
menu: ${ucfirst(type)}s
route: /${type}s/${component}
---

import { Playground, Props } from 'docz';
import { ${component} } from '../index';
import { ThemeWrapper } from 'docs/helpers/ThemeWrapper';

# ${component}

## Basic ${lcfirst(component)}

<Playground>
  <ThemeWrapper>
    <${component} />
  </ThemeWrapper>
</Playground>

## \\\[props\\\]

<Props of={${component}} />
`);

console.log(chalk.green(`🚀 Generated ${src}`));