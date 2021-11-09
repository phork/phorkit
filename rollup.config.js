import 'core-js';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const fs = require('fs-extra');
const path = require('path');
const replace = require('@rollup/plugin-replace');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve: resolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const postcss = require('rollup-plugin-postcss');
const copy = require('rollup-plugin-copy');
const json = require('@rollup/plugin-json');
const typescript = require('@rollup/plugin-typescript');
const chalk = require('chalk');
const stringHash = require('string-hash');

const pkg = require('./package.json');
const componentInfo = require('./component-info.json');

const root = path.resolve('./');
const destination = `${root}/lib`;

// treat dependencies and babel runtime helpers as external so they're not bundled in with other components
const external = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies), /@babel\/runtime/];

// eslint-disable-next-line prefer-destructuring
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';

const FORMAT = 'esm';

const longNames = `[local]__[contenthash:base64:5]`;

// [BUG]: just using `[contenthash:base64:5]` for the name loses some styles, like dark button colors
const shortNames = (name, filename, css) => {
  const disableMinification = css.includes('/* phorkit-disable-minification */');
  const lineNumber = css.split(/[\r\n]/).findIndex(line => new RegExp(`.${name}(?![a-z0-9-_])`, 'gi').test(line));
  const hash = stringHash(css).toString(36).substr(-3);
  const mods = disableMinification
    ? name
    : name
        .split('-')
        .filter(Boolean)
        .map(mod => mod.replace(/[aeiou]*/g, '').substr(0, 3))
        .join('');

  return `_${hash}${disableMinification ? '' : lineNumber}${mods ? `-${mods}` : ''}`;
};

// eslint-disable-next-line no-console
console.log(chalk.green(`🤖 Building the components for ${NODE_ENV}...`));

// remove previously built lib
if (!isDev) {
  fs.removeSync(destination);
}

const sharedBabelConfig = {
  exclude: ['node_modules/**'],
  presets: ['@babel/preset-react', ['@babel/preset-env', { modules: false }]],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    '@emotion/babel-plugin',
  ],
  babelrc: false,
  sourceType: 'unambiguous',
  babelHelpers: 'runtime',
};

const getDestination = (format = 'esm') => {
  if (format === 'esm') {
    return `${destination}/${path.dirname(pkg.module)}`;
  }

  if (format === 'cjs') {
    return `${destination}/${path.dirname(pkg.main)}`;
  }
};

const scriptsConfig = ['esm', 'cjs'].map(format => ({
  input: `./src/index.ts`,
  output: {
    dir: getDestination(format),
    format,
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  external,
  plugins: [
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true,
    }),
    resolve({
      extensions: ['.js', '.ts', '.tsx'],
    }),
    typescript({
      tsconfig: `tsconfig.${format}.json`,
      // this plugin only includes compilerOptions from the tsconfig
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/stories/*', 'src/**/stories/*', 'src/**/*.stories.tsx'],
    }),
    !isDev && sizeSnapshot(),
    babel(sharedBabelConfig),
    commonjs({
      include: 'node_modules/**',
    }),
    postcss({
      autoModules: false,
      modules: {
        generateScopedName: isDev ? longNames : shortNames,
      },
      config: {
        ctx: {
          prettify: false,
        },
      },
    }),
    !isDev && terser(),
  ],
}));

const stylesDest = `${destination}/styles`;

// export the shared global CSS files and fonts
const sharedStyleConfig = ['common.css', 'normalize.css'].map(name => ({
  input: `./src/styles/${name}`,
  output: { file: `${stylesDest}/${name}` },
  plugins: [
    postcss({
      autoModules: false,
      extract: true,
      modules: false,
      config: {
        ctx: {
          prettify: false,
        },
      },
    }),
  ],
}));

const fontConfig = {
  input: `./src/styles/fonts.css`,
  output: { file: `${stylesDest}/fonts.css` },
  plugins: [
    postcss({
      autoModules: false,
      extract: true,
      modules: false,
      config: {
        ctx: {
          prettify: false,
        },
      },
    }),
    copy({
      targets: [
        {
          src: './src/styles/fonts',
          dest: `${destination}/styles`,
        },
      ],
      verbose: true,
    }),
  ],
};

// export common CSS modules which can be imported in consumer apps
const commonStylesSrc = './src/styles/common/';
const commonStylesModules = fs.readdirSync(commonStylesSrc, { withFileTypes: true }).filter(src => !src.isDirectory());
const stylesConfigs = commonStylesModules.map(src => ({
  input: `${commonStylesSrc}${src.name}`,
  output: { file: `${stylesDest}/modules/common/${path.basename(src.name)}`, format: 'esm' },
  external,
  plugins: [
    !isDev && sizeSnapshot(),
    babel(sharedBabelConfig),
    postcss({
      autoModules: false,
      extract: true,
      modules: false,
      config: {
        ctx: {
          prettify: true,
        },
      },
    }),
    copy({
      targets: [
        {
          src: './src/postcss/vars/mediaRules.json',
          dest: `${destination}/styles`,
        },
      ],
      verbose: true,
    }),
  ],
}));

// export standalone CSS packages for each component
const rawStylesConfigs = [...new Set(componentInfo.flatMap(({ css }) => css).filter(Boolean))].map(src => ({
  input: src,
  output: { file: `${stylesDest}/modules/components/${path.basename(src)}`, format: FORMAT },
  external,
  plugins: [
    postcss({
      autoModules: false,
      extract: true,
      modules: false,
      config: {
        ctx: {
          prettify: true,
        },
      },
    }),
  ],
}));

const configs = [...scriptsConfig, ...sharedStyleConfig, fontConfig, ...stylesConfigs, ...rawStylesConfigs];

export default configs;
