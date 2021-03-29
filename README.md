# Phork/it

[![Tests](https://github.com/phork/phorkit/actions/workflows/ci.yml/badge.svg)](https://github.com/phork/phorkit/actions/workflows/ci.yml) [![Publish](https://github.com/phork/phorkit/actions/workflows/publish.yml/badge.svg)](https://github.com/phork/phorkit/actions/workflows/publish.yml)

To see examples and documentation go to [https://phorkit.phork.org/](https://phorkit.phork.org/).

## Getting started

Include the common styles and fonts in `index.js`.

```
import '@phork/phorkit/lib/styles/normalize.css';
import '@phork/phorkit/lib/styles/fonts.css';
import '@phork/phorkit/lib/styles/common.css';
```

Include the basic providers in `App.js`.

```
<AccessibilityProvider>
  <ThemeProvider themeId={light|dark}>
    hello world
  </Theme>
</AccessibilityProvider>
```

[Contribution guidelines for this project](CONTRIBUTING.md)
