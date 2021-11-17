#!/usr/bin/env node

'use strict';

const fs = require('fs');
const chalk = require('chalk');
const lineByLine = require('n-readlines');
const writeFileSyncRecursive = require('./utils/write-file');

const getTsOrJsExtension = src => {
  const preferredOrder = ['tsx', 'ts', 'jsx', 'js'];
  const [, fileName] = src.match(/([^.]*)(\.(ts|tsx|js|jsx))?/);
  for (var i in preferredOrder) {
    if (fs.existsSync(`${fileName || src}.${preferredOrder[i]}`)) {
      return `${fileName || src}.${preferredOrder[i]}`;
    }
  }
};

const getComponentStyleIncludes = (folder, src) => {
  const files = [];
  let buffer;
  let reachedImports = false;

  const liner = new lineByLine(src);
  while (buffer = liner.next()) {
   const line = buffer.toString('ascii');
   if (line.match(/^import /)) {
      const matches = line.match(/^import \w+ from '\.\/(styles\/.*\.module\.css)'/)
      if (matches?.[1]) {
        files.push(`${folder}/${matches[1]}`)
      }

    /**
     * If we've already reached the imports section and
     * the line being read is not an import then we can
     * assume the imports section is done and exit the
     * reader.
     */
    } else if (reachedImports) {
      break;
    }
  }

  return files.length ? files : undefined;
};

const formatters = {
  helpers: ({ src, component }) => {
    return {
      component,
      src: getTsOrJsExtension(`${src}/${component}`),
      helper: true,
    };
  },
  default: ({ src, file, component }) => {
    const pkg = {
      component,
      src: getTsOrJsExtension(`${src}/${file || component}`),
    };

    const folder = `${src}/styles`;
    if (fs.existsSync(folder)) {
      const css = getComponentStyleIncludes(src, pkg.src);
      if (css) {
        pkg.css = css;
      }
    }
    return pkg;
  },
};

const getFileOrIndex = src => {
  if (src.match(/\.[jt]sx?$/)) return src;

  const stats = fs.existsSync(src) && fs.statSync(src);
  return stats && stats.isDirectory() ? getTsOrJsExtension(`${src}/index.js`) : getTsOrJsExtension(`${src}.js`);
};

const isDirectory = src => fs.existsSync(src) && fs.lstatSync(src).isDirectory();

const getModules = ({ src, formatter, response = [], recursive, ignore }) => {
  const modules = fs
    .readFileSync(getFileOrIndex(src), 'utf8')
    .split(/\n/)
    .reduce((acc, line) => {
      const matches = line.match(/^export {?([^}]*)}? from '.\/(.*)'/);
      if (matches && matches[1]) {
        if (matches[1] === '*') {
          if (recursive && isDirectory(`${src}/${matches[2]}`)) {
            getModules({ src: `${src}/${matches[2]}`, formatter, response, recursive, ignore });
          } else if (!ignore || !ignore.includes(matches[2])) {
            acc.push(formatter({ src, component: matches[2] }));
          }
        } else {
          acc.push(
            ...matches[1]
              .trim()
              .split(/\s?,\s?/)
              .map(component => formatter({ src, component, file: matches[2] })),
          );
        }
      }
      return acc;
    }, []);

  response.push(...modules);
  return response;
};

/**
 * This script generates the flattened component info for Rollup
 */
(async () => {
  console.log(chalk.blue('🤖 Generating component-info.json...'));

  const modules = ['components', 'compositions', 'context', 'icons'].flatMap(category => {
    return getModules({
      src: `src/${category}`,
      formatter: formatters[category] || formatters.default,
      recursive: true,
      ignore: ['types'],
    });
  });

  modules.push(...getModules({ src: `src/hooks`, formatter: formatters.helpers }));
  modules.push(...getModules({ src: `src/utils`, formatter: formatters.helpers }));

  const duplicates = modules
    .map(({ component }) => component)
    .sort()
    .filter((component, index, src) => src[index + 1] && component === src[index + 1]);
  if (duplicates.length) {
    throw new Error(`❌ Duplicate module names ${duplicates.join(', ')}`);
  }

  const invalid = modules
    .map(({ component, src, css }) => (!fs.existsSync(src) || (css && css.some(file => !fs.existsSync(file))) ? component : undefined))
    .filter(Boolean);
  if (invalid.length) {
    throw new Error(`❌ Invalid paths ${invalid.join(', ')}`);
  }

  writeFileSyncRecursive('./component-info.json', JSON.stringify(modules));
  console.log(chalk.green('🚀 Generated component-info.json'));
})();
