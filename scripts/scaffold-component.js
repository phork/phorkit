#!/usr/bin/env node

'use strict'

const chalk = require('chalk')
const program = require('commander')
const fs = require('fs')
const pkg = require('../package.json')
const writeFileSyncRecursive = require('./utils/write-file');

program
  .version(pkg.version)
  .usage('[options]')
  .addOption(new program.Option('-t, --type <type>', 'type (component or composition)').choices(['component', 'composition']).default('component'))
  .option('-p, --parent <parent>', 'parent component (optional)')
  .requiredOption('-c, --component <component>', 'component name');

program.on('--help', function(){
  console.log('')
  console.log('Examples:');
  console.log('  $ scaffold-component --help');
  console.log('  $ scaffold-component -c Button');
  console.log('  $ scaffold-component -c Tooltip -t composition');
  console.log('  $ scaffold-component -c ButtonGroup -p Button');
});

program.parse(process.argv);

const { component, type = 'component', parent } = program.opts();
const src = `./src/${type}s/${parent || component}`;
const testSrc = `./__tests__/${type}s/${parent || component}`;
const relativeSrc = '../'.repeat(2 + (parent ? (parent.match(/\//g) || []).length : 0));

if (typeof component === 'undefined') {
  console.log(chalk.red('Missing argument -c or --component. Try --help'))
  process.exit(1);
}

console.log(chalk.blue(`🤖 Generating the ${component} ${type}`))

const lcfirst = input => {
  return input.charAt(0).toLowerCase() + input.slice(1);
}

const ucfirst = input => {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

// generate the component boilerplate
writeFileSyncRecursive(`${src}/${component}.tsx`, `
import React from 'react';
import { cx } from '@emotion/css';
import { ThemeProps } from '${relativeSrc}types';
import { useThemeId } from '${relativeSrc}hooks/useThemeId';
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

// generate the styles boilerplate
writeFileSyncRecursive(`${src}/styles/${component}.module.css`, `
.${lcfirst(component)} {
}
`);

// generate the docz boilerplate
writeFileSyncRecursive(`${src}/docs/${lcfirst(component)}.mdx`, `
---
name: ${component}
menu: ${ucfirst(type)}s
route: /${type}s/${component}
---

import { Playground, Props } from 'docz';
import { PageTitle } from 'docs/helpers/PageTitle';
import { ThemeWrapper } from 'docs/helpers/ThemeWrapper';
import { ${component} } from '../index';

<PageTitle title="${component}" src="${type}s/${parent || component}" />

## Basic ${lcfirst(component)}

<Playground>
  <ThemeWrapper>
    <${component} />
  </ThemeWrapper>
</Playground>

## \\\[props\\\]

<Props of={${component}} />
`);

// generate the tests boilerplate
writeFileSyncRecursive(`${testSrc}/${component}.test.tsx`, `
import { render } from '@testing-library/react'
import React from 'react'
import { ${component} } from 'lib'

describe('<${component} />', () => {
  it('should render', () => {
    const { queryByText } = render(
      <${component}>Hello world</${component}>,
    )
    expect(queryByText('Hello world')).toBeTruthy()
  })
})
`)

// generate or update the component index
if (fs.existsSync(`${src}/index.ts`)) {
  fs.appendFileSync(
    `${src}/index.ts`,
    `export * from './${component}';\n`
  );
} else {
  writeFileSyncRecursive(
    `${src}/index.ts`,
    `export * from './${component}';\n`
  );
}

// add the export to the index file
if (!parent) {
  const lines = [`export * from './${component}';`, ...fs.readFileSync(`src/${type}s/index.ts`).toString().split('\n')].sort()
  writeFileSyncRecursive(`src/${type}s/index.ts`, [...new Set(lines)].join('\n'))
}

console.log(chalk.green(`🚀 Generated ${src}`));
