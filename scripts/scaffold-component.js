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
  .addOption(new program.Option('-t, --type <type>', 'component type').choices(['component', 'composition']).default('component'))
  .addOption(new program.Option('-f, --files <files...>', 'files to scaffold').choices(['component', 'styles', 'docz', 'storybook', 'tests', 'exports']))
  .option('-p, --parent <parent>', 'parent component (optional)')
  .requiredOption('-c, --component <component>', 'component name');

program.on('--help', function(){
  console.log('')
  console.log('Examples:');
  console.log('  $ scaffold-component --help');
  console.log('  $ scaffold-component -c Button');
  console.log('  $ scaffold-component -c Tooltip -t composition');
  console.log('  $ scaffold-component -c ButtonGroup -p Button');
  console.log('  $ scaffold-component -c Button -f component styles');
  console.log('  $ scaffold-component -c Checkbox -p Form/Checkbox -f storybook');
});

program.parse(process.argv);

const { component, type = 'component', parent, files } = program.opts();
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

const include = type => !files || files.includes(type)

// generate the component boilerplate
include('component') && writeFileSyncRecursive(`${src}/${component}.tsx`, `
import React from 'react';
import { cx } from '@emotion/css';
import { ThemeProps } from '${relativeSrc}types';
import { useThemeId } from '${relativeSrc}context/Theme';
import styles from './styles/${component}.module.css';

export type ${component}Props = React.HTMLAttributes<HTMLDivElement> &
  ThemeProps & {
    children: React.ReactChild | React.ReactFragment;
    className?: string;
    style?: React.CSSProperties;
  };

export function ${component}({ children, className, themeId: initThemeId, unthemed, ...props }: ${component}Props): JSX.Element {
  const themeId = useThemeId(initThemeId);

  return (
    <div
      className={cx(
        styles.${lcfirst(component)},
        themeId && !unthemed && styles[\`${lcfirst(component)}--\${themeId}\`],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

${component}.displayName = '${component}';
`);

// generate the styles boilerplate
include('styles') && writeFileSyncRecursive(`${src}/styles/${component}.module.css`, `
.${lcfirst(component)} {
}
`);

// generate the docz boilerplate
include('docz') && writeFileSyncRecursive(`${src}/docs/${lcfirst(component)}.mdx`, `
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

// generate the storybook boilerplate
include('storybook') && writeFileSyncRecursive(`${src}/stories/${component}.stories.tsx`, `
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { ${component}, ${component}Props } from '../${component}';

export default {
  title: 'Unsorted/${component}',
  component: ${component},
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },

    className: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    contrast: {
      table: {
        category: 'Uncommon',
      },
    },
    style: {
      table: {
        category: 'Uncommon',
      },
    },
    themeId: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    unthemed: {
      table: {
        category: 'Uncommon',
      },
    },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="${type}s/${parent || component}" title="${component}" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof ${component}>;

const Template: ComponentStory<typeof ${component}> = args => <${component} {...args} />;

const defaultArgs = {
  contrast: false,
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
`);

// generate the tests boilerplate
include('tests') && writeFileSyncRecursive(`${testSrc}/${component}.test.tsx`, `
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
if (include('exports')) {
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
}

// add the export to the index file
if (include('exports') && !parent) {
  const lines = [`export * from './${component}';`, ...fs.readFileSync(`src/${type}s/index.ts`).toString().split('\n')].sort()
  writeFileSyncRecursive(`src/${type}s/index.ts`, [...new Set(lines)].join('\n'))
}

console.log(chalk.green(`🚀 Generated ${src}`));
