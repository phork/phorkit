# Contributing to phork/it

## Requirements

- Node.js >= 15
- yarn
- npx

## Getting started

To start a development server go to the project root and run:

```bash
$ yarn install
$ yarn start
```

Open [http://localhost:4000](http://localhost:4000) in your browser. The page will reload when the app has been edited.

#### Building the library

To build the component library run:

```bash
$ yarn build-lib
```

To build a development bundle run:

```bash
$ yarn build-lib-debug
```

#### Building the documention

To build the docs run:

```bash
$ yarn build-docs
```

To build and preview the docs with Docker run:

```bash
$ docker build -f .docker/prod/Dockerfile . -t phork/phorkit
$ docker run -p 3000:80 phork/phorkit
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

The phork/it library is broken down into several categories.

### Components

Components are nearly completely self-contained. They should define all their styles as CSS modules and should not rely on global styles. A component is allowed to use global `context`, `hooks`, `utils` and `icons`.

> When a component (or anything) from this library includes something else from this library the import must use a relative path. This will allow rollup to treat the import as an external dependency and not include it in the bundle.

If a component has been wrapped with a higher order component (for example `withTheme`) then the original, unwrapped component should be exported as `ComponentName` and the wrapped component should be exported as `[Enhanced]ComponentName`. For example `ColoredBadge`.

If a component can have style props passed to it and applied via Emotion then that component should be named `StyledComponentName`. For example `StyledBadge`.

### Compositions

Compositions are like components in every way except they can also include one or more components. The most commonly included components are `Rhythm`, `Flex` and `Button`. These imports must be included with their relative path.

### Context

Context includes providers and consumers of top-level application context (eg. the `themeId`). Any component-level context should be contained within the component's scope (see `Toasts`).

### Icons

Icon components are generated automatically from the svg files in `public/icons`. Icons used for the documentation are in `public/icons/internal`.

### Hooks and Utils

These are common hooks and utilities that are shared by components and compositions.

### Config

The config files are bundled together into `config.json` at the project root, as well as in the the `config` folder of each package. Most configuration is actually done in the `postcss` files.

### Styles

The normalize styles, common styles and fonts have been bundled into `styles`. Additionally there's a `modules` folder containing some common CSS classes that will be exported as modules.

### PostCSS

All color, sizing and spacing definitions comes from the `postcss` files. Only the `*.js` files should be edited. _Do not edit the `_.json` files.\* They will be overwritten during the build cycle.

## Theming

Any component that deals with color should have a light and dark theme. Most colors are applied by CSS custom properties. The component should include the `useThemeId` hook, or (for styled components) be named and exported as `ComponentName` along side a component wrapped with the `withTheme` HOC named `ColoredComponentName`.

Many components also have an optional `contrast` property. These components use one of the primary colors as the background color and the contrast color in varying shades as the foreground colors. The default primary color is the theme's primary accent color but can be overridden with the CSS custom property `--contrast-color`. This value cascades to all children components so use it wisely.

### Commits

All commits abide by the rules of the [conventional changelog](https://github.com/conventional-changelog/commitlint) and must be in the following format:

```bash
$ git commit -m ':gitmoji: type: short commit message starting with lowercase'
```

For a breaking change add an exclamation point after the type.

```bash
$ git commit -m ':gitmoji: type!: short commit message starting with lowercase'
```

Using a pre-defined [Gitmoji](https://gitmoji.dev/) and then one of these following types.

- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to the CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **revert**: Revert a previous commit
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

For example

```bash
$ git commit -m ':bug: fix: broken button width'
```

### Publishing

Publishing is automated by Github actions. Any pushes to the `main` branch will be automatically versioned and published by [semantic-release](https://semantic-release.gitbook.io/semantic-release/).
