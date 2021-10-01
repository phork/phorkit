# Contributing to Phork/it

## Requirements

- Node.js >= 15
- yarn
- npx

## Getting started

### Using Docz (current)

Phork/it uses [Docz](https://www.docz.site/) to publish the documentation.

To start a Docz development server go to the project root and run:

```bash
$ yarn install
$ yarn start
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

### Using Storybook (next)

The documentation is in the process of moving to [Storybook](https://storybook.js.org/).

To start a Storybook development server go to the project root and run:

```bash
$ yarn install
$ yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) in your browser.

## Building the documentation

### Using Docz (current)

The build system writes the Docz file to `build/docz`. To build the app locally run:

```bash
$ yarn build-docs
```

To build and preview the Docz app with Docker run:

```bash
$ docker build -f .docker/docz/Dockerfile . -t phork/phorkit
$ docker run -p 3000:80 phork/phorkit
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using Storybook (next)

The build system writes the Storybook files to `build/storybook`. To build the app locally run:

```bash
$ yarn build-storybook
```

To build and preview the Storybook app with Docker run:

```bash
$ docker build -f .docker/storybook/Dockerfile . -t phork/phorkit
$ docker run -p 3000:80 phork/phorkit
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building the library

The build system writes everything to the `lib` folder. This includes:

- `lib/cjs` - Phork/it exported as CJS modules
- `lib/esm` - Phork/it exported as ESM modules
- `lib/styles` - All of the common styles and the styles extracted from the components
- `lib/config.json` - All of the colors, sizes and other vars defined in the `postcss/vars`

To build the publishable component library run:

```bash
$ yarn build-lib
```

To build the component library for development use run:

```bash
$ yarn build-lib-debug
```

## Development

Phork/it library is broken down into several categories. Everything lives in the `src` folder.

### Components

Components are nearly completely self-contained. They should define all their styles as CSS modules using BEM syntax and should not rely on global styles. A component is allowed to use global `context`, `hooks`, `utils` and `icons`.

**When a component (or anything) from this library includes something else from this library the import must use a relative path. This will allow rollup to treat the import as an external dependency and not include it in the bundle.**

If a component has been wrapped with a higher order component (for example `withTheme`) then the original, unwrapped component should be exported as `ComponentName` and the wrapped component should be exported as `[Enhanced]ComponentName`. For example `Badge` and `ColoredBadge`.

If a component can have style props passed to it and applied via Emotion then that component should be named `StyledComponentName`. For example `Badge` and `StyledBadge`.

When starting a new component it's recommended to use the scaffolding script to generate boilerplate for all the necessary files. See `yarn scaffold --help` for more information.

### Compositions

Compositions are like components in every way except they can also include one or more components. The most commonly included components are `Rhythm`, `Flex` and `Button`. These imports must be included with their relative path.

### Context

Context includes providers and consumers of top-level application context (eg. the `themeId`). Any component-level context should be contained within that component's scope (see `Toasts`).

### Icons

Icon components are generated automatically from the SVG files in `public/icons`. Icons used only for the documentation are in `public/icons/internal`.

### Hooks and Utils

These are common hooks and utilities that are shared by components and compositions.

### Config

The config files generally just include the JSON files generated from the PostCSS configuration. Not much configuration should happen outside of PostCSS. When the library is built the config files are bundled together into `config.json` at the build root.

### Styles

These are all the styles to be imported globally, including normalize styles, common styles (`html`, `body`), and fonts. There's also a `modules` folder containing some common CSS classes that will be exported as modules during the build process. All stylesheets should use BEM syntax.

### PostCSS

All color, sizing and spacing definitions come from the PostCSS files. Only the `*.js` files should be edited. **Do not edit the JSON files.** They will be overwritten during the build cycle.

## Theming

Any component that deals with color should have a light and dark theme. Most components should include the `useThemeId` hook. Styled components can use the `withTheme` HOC. Most colors are applied by CSS classes which should be named using BEM syntax (eg. `.button--light` and `.button--dark`) and should use CSS custom properties to define the colors.

Many components also have an optional `contrast` property. These components use one of the primary colors as the background color and the contrast color in varying shades as the foreground colors. The default primary color is the theme's primary accent color but can be overridden with the CSS custom property `--contrast-color`. This value cascades to all children components so use it wisely.

An simple component stylesheet might look like this:

```css
.awesomeness {
  @mixin themed {
    background-color: $theme-primary-palette-background-color;
    color: $theme-primary-palette-text-color;
  }
}
```

```html
<div class="awesomeness awesomeness--light">Hello world</div>
<div class="awesomeness awesomeness--dark">Hello world</div>
```

A component stylesheet using CSS custom properties might look like this:

```css
.awesomeness {
  background-color: var(--awesomeness-background-color);
  color: var(--awesomeness-text-color);
}

.awesomeness--primary {
  @mixin themed .awesomeness {
    --awesomeness-background-color: $theme-primary-palette-background-color;
    --awesomeness-text-color: $theme-primary-palette-text-color;
  }
}

.awesomeness--secondary {
  @mixin themed .awesomeness {
    --awesomeness-background-color: $theme-secondary-palette-background-color;
    --awesomeness-text-color: $theme-secondary-palette-text-color;
  }
}

.awesomeness--contrast {
  @mixin themed .awesomeness {
    --awesomeness-background-color: var(--contrast-color, $theme-contrast-palette-background-color);
    --awesomeness-text-color: $theme-contrast-palette-text-color;
  }
}
```

```html
<div class="awesomeness awesomeness--primary awesomeness--light">Hello world</div>
<div class="awesomeness awesomeness--secondary awesomeness--light">Hello world</div>
<div class="awesomeness awesomeness--contrast awesomeness--light">Hello world</div>
```

## Commits

All commits abide by the rules of the [conventional changelog](https://github.com/conventional-changelog/commitlint) and commit messages must be in the following format:

```bash
$ git commit -m ':gitmoji: type: short commit message starting with lowercase'
```

For a breaking change add an exclamation point or `(major)` after the type.

```bash
$ git commit -m ':gitmoji: type!: short commit message starting with lowercase'
$ git commit -m ':gitmoji: type(major): short commit message starting with lowercase'
```

These commit messages must use a pre-defined [Gitmoji](https://gitmoji.dev/) and then one of these following types.

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
$ git commit -m ':recycle: refactor(major): replace all somethings with something elses.'
```

The optional full commit message format is

```
:gitmoji: type(scope?): subject
body?
footer?
```

## Publishing

Publishing is automated by Github actions. Any pushes to the `main` branch will be automatically versioned and published by [semantic-release](https://semantic-release.gitbook.io/semantic-release/).
