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
  console.log('  $ scaffold-component --help');
  console.log('  $ scaffold-component -c Button');
  console.log('  $ scaffold-component -c Tooltip -t composition');
});

program.parse(process.argv);

const { component, type = 'component' } = program.opts();
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

${component}.displayName = '${component}';
`);

writeFileSyncRecursive(`${src}/index.ts`, `
export * from './${component}';
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
import { ThemeWrapper } from 'docs/helpers/ThemeWrapper';
import { ${component} } from '../index';

# ${component}

## Basic ${ucfirst(component)}

<Playground>
  <ThemeWrapper>
    <${component} />
  </ThemeWrapper>
</Playground>

## \\\[props\\\]

<Props of={${component}} />
`);

console.log(chalk.green(`🚀 Generated ${src}`));
console.log(chalk.red(`📣 Don't forget to export this component from ${type}/index.ts`));
