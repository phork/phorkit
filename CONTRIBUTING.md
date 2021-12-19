# Contributing to Phork/it

## Requirements

- Node.js >= 15
- yarn
- npx

## Getting started

### Using Storybook (current)

Phork/it uses [Storybook](https://storybook.js.org/) to publish the documentation.

To start a Storybook development server go to the project root and run:

```bash
$ yarn install
$ yarn start-storybook
```

### Using Docz (legacy)

Phork/it previously used [Docz](https://www.docz.site/) to publish the documentation.

To start a Docz development server go to the project root and run:

```bash
$ yarn install
$ yarn start-docz
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

## Building the documentation

### Using Storybook (current)

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

### Using Docz (legacy)

The build system writes the Docz file to `build/docz`. To build the app locally run:

```bash
$ yarn build-docz
```

To build and preview the Docz app with Docker run:

```bash
$ docker build -f .docker/docz/Dockerfile . -t phork/phorkit
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
```

```html
<div class="awesomeness awesomeness--primary awesomeness--light">Hello world</div>
<div class="awesomeness awesomeness--primary awesomeness--dark">Hello world</div>
<div class="awesomeness awesomeness--secondary awesomeness--light">Hello world</div>
<div class="awesomeness awesomeness--secondary awesomeness--dark">Hello world</div>
```

### Custom colors

The default accent color is blue, however it can be overridden using CSS custom properties. The properties that will need overriding for a custom accent color are listed below.

| Property                        | Description                                                                            | Example                 |
| ------------------------------- | -------------------------------------------------------------------------------------- | ----------------------- |
| `--phork-accent-color`          | The main accent color                                                                  | #642da0                 |
| `--phork-accent-color-contrast` | The contrast color                                                                     | #fff                    |
| `--phork-accent-color-shade`    | The main accent color with an opacity of `.1` flattened on a background of `color-BG0` | #f0eaf6                 |
| `--phork-accent-color-L10`      | The main accent color lightened by a shade                                             | #803dc8                 |
| `--phork-accent-color-L20`      | The main accent color lightened by 2 shades                                            | #9d69d5                 |
| `--phork-accent-color-L30`      | The main accent color lightened by 3 shades                                            | #b995e1                 |
| `--phork-accent-color-D10`      | The main accent color darkened by a shade                                              | #4b2278                 |
| `--phork-accent-color-D20`      | The main accent color darkened by 2 shades                                             | #57278c                 |
| `--phork-accent-color-D30`      | The main accent color darkened by 3 shades                                             | #3e1c64                 |
| `--phork-accent-color-O5`       | The main accent color with an opacity of .05                                           | rgba(100, 45, 160, .05) |

Many components also have an optional `contrast` property. These components use one of the primary colors as the background color and the contrast color in varying shades as the foreground colors. The default primary color is the theme's primary accent color but can be overridden with the CSS custom property `--phork-contrast-color`.

CSS custom properties can be overridden at the application root level or at the component level. For example:

```css
:root {
  --phork-accent-color: #642da0;
  --phork-accent-color-contrast: #ffffff;
  --phork-accent-color-L10: #803dc8;
  --phork-accent-color-L20: #9d69d5;
  --phork-accent-color-L30: #b995e1;
  --phork-accent-color-D10: #57278c;
  --phork-accent-color-D20: #4b2278;
  --phork-accent-color-D30: #3e1c64;
  --phork-accent-color-shade: #f3eff8;
  --phork-accent-color-O5: rgba(100, 45, 160, 0.05);
  --phork-contrast-color: #642da0;
}
```

```jsx
<Button
  style={{
    '--phork-accent-color': '#642da0',
    '--phork-accent-color-contrast': '#d6c1ee',
    '--phork-accent-color-L10': '#803dc8',
    '--phork-accent-color-D10': '#57278c',
  } as React.CSSProperties}
>
  Click me!
</Button>
```

## Commits

All commits abide by the rules of the [conventional changelog](https://github.com/conventional-changelog/commitlint) and commit messages must be in the following format:

```bash
$ git commit -m ':gitmoji: type: short commit message starting with lowercase'
```

For a breaking change add a `(major)` scope after the type.

```bash
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
$ git commit -m ':bug: fix: added missing width to button'
$ git commit -m ':recycle: refactor(major): replaced all somethings with something elses.'
```

The optional full commit message format is

```
:gitmoji: type(scope?): subject
body?
footer?
```

## Publishing

Any push to the `main` branch will trigger the [publish](.github/workflows/publish.yml) workflow which uses [semantic-release](https://semantic-release.gitbook.io/semantic-release/) to update the version and the changelog, create a new tag, and publish the package to Github packages.

When a release is created from a tag the package will be published to NPM and the documentation will be published to [https://phorkit.phork.org/](https://phorkit.phork.org/).
