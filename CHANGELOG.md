# Changelog

# [15.1.0](https://github.com/phork/phorkit/compare/v15.0.0...v15.1.0) (2022-07-16)

### 🐛 Bug Fixes

- better typescript, eslint ([4629182](https://github.com/phork/phorkit/commit/4629182))
- color looper regex fix for safari ([aa67e3a](https://github.com/phork/phorkit/commit/aa67e3a))
- revert AsReactType generics ([39e578d](https://github.com/phork/phorkit/commit/39e578d))
- update avatar sizes focus rings ([e7aebdc](https://github.com/phork/phorkit/commit/e7aebdc))

## [15.0.1](https://github.com/phork/phorkit/compare/v15.0.0...v15.0.1) (2022-01-05)

### 🐛 Bug Fixes

- update avatar sizes focus rings ([e7aebdc](https://github.com/phork/phorkit/commit/e7aebdc))

# [15.0.0](https://github.com/phork/phorkit/compare/v14.0.1...v15.0.0) (2022-01-04)

### ♻ Code Refactoring

- **major**: removed event from useDeepFocusGroup callbacks ([82cf1cc](https://github.com/phork/phorkit/commit/82cf1cc))
- cleaned up DropdownContent state ([d6c9fed](https://github.com/phork/phorkit/commit/d6c9fed))
- minor focus trap improvements ([7b5c888](https://github.com/phork/phorkit/commit/7b5c888))

### ✨ Features

- added focus trap, better accessibility to Popover ([a1b6340](https://github.com/phork/phorkit/commit/a1b6340))
- scroll sync virtualized ([22b98ff](https://github.com/phork/phorkit/commit/22b98ff))
- scroll sync virtualized ([38b1c66](https://github.com/phork/phorkit/commit/38b1c66))

### 🐛 Bug Fixes

- added missing useFocusTrap export ([85b755c](https://github.com/phork/phorkit/commit/85b755c))
- decreased timeline divider width by 1px ([cab81ae](https://github.com/phork/phorkit/commit/cab81ae))
- minor aria improvements to dropdown ([6a9ad92](https://github.com/phork/phorkit/commit/6a9ad92))
- remove tabIndex from read only tags ([24126eb](https://github.com/phork/phorkit/commit/24126eb))

# [14.1.0](https://github.com/phork/phorkit/compare/v14.0.1...v14.1.0) (2021-12-03)

### ✨ Features

- added focus trap, better accessibility to Popover ([a1b6340](https://github.com/phork/phorkit/commit/a1b6340))

### 🐛 Bug Fixes

- decreased timeline divider width by 1px ([cab81ae](https://github.com/phork/phorkit/commit/cab81ae))

## [14.0.2](https://github.com/phork/phorkit/compare/v14.0.1...v14.0.2) (2021-12-01)

### 🐛 Bug Fixes

- decreased timeline divider width by 1px ([cab81ae](https://github.com/phork/phorkit/commit/cab81ae))

## [14.0.1](https://github.com/phork/phorkit/compare/v14.0.0...v14.0.1) (2021-11-30)

### 🐛 Bug Fixes

- made all permanent panels inflexible by default ([6303bb8](https://github.com/phork/phorkit/commit/6303bb8))
- marked the themeId prop in toggleThemeId as optional ([9da6e03](https://github.com/phork/phorkit/commit/9da6e03))

# [14.0.0](https://github.com/phork/phorkit/compare/v13.2.0...v14.0.0) (2021-11-29)

### ♻ Code Refactoring

- improved popover and tooltip errors ([b3ead41](https://github.com/phork/phorkit/commit/b3ead41))
- **major**: updated most children types ([9b9537d](https://github.com/phork/phorkit/commit/9b9537d))

### ✨ Features

- allow Timeline children as an alternative to items ([0ae5fac](https://github.com/phork/phorkit/commit/0ae5fac))

### 🐛 Bug Fixes

- increase text tooltip tail border widths ([820c91d](https://github.com/phork/phorkit/commit/820c91d))

# [13.2.0](https://github.com/phork/phorkit/compare/v13.1.0...v13.2.0) (2021-11-27)

### ✨ Features

- updated timeline components to allow for more variation ([d943d9f](https://github.com/phork/phorkit/commit/d943d9f))

### 🐛 Bug Fixes

- adjust width of tooltip triangle border ([3dfe4b8](https://github.com/phork/phorkit/commit/3dfe4b8))

# [13.1.0](https://github.com/phork/phorkit/compare/v13.0.0...v13.1.0) (2021-11-24)

### ♻ Code Refactoring

- auto-generate shade colors, add primary shades ([2909f69](https://github.com/phork/phorkit/commit/2909f69))
- renamed Colored*.ts to *.tsx ([7dbfab9](https://github.com/phork/phorkit/commit/7dbfab9))

### ✨ Features

- added ColoredShade component ([69217f8](https://github.com/phork/phorkit/commit/69217f8))
- added StyledShade component ([5e2f68b](https://github.com/phork/phorkit/commit/5e2f68b))
- added Timeline component ([31e3382](https://github.com/phork/phorkit/commit/31e3382))

# [13.0.0](https://github.com/phork/phorkit/compare/v12.0.0...v13.0.0) (2021-11-18)

### ♻ Code Refactoring

- **major**: removed EventListener component ([fe4ef27](https://github.com/phork/phorkit/commit/fe4ef27))
- **major**: updated primary colors, added lime green ([81318a4](https://github.com/phork/phorkit/commit/81318a4))

### ✨ Features

- include theme color adjustments in theme config ([42bd850](https://github.com/phork/phorkit/commit/42bd850))

# [12.0.0](https://github.com/phork/phorkit/compare/v11.0.1...v12.0.0) (2021-11-11)

### ♻ Code Refactoring

- update Navigation to use SizeProvider ([64ba9bc](https://github.com/phork/phorkit/commit/64ba9bc))

### ✨ Features

- added color-P00, standardized accent color adjustments ([0a6d244](https://github.com/phork/phorkit/commit/0a6d244))
- **major**: allow for custom accent colors ([616336e](https://github.com/phork/phorkit/commit/616336e))

### 🐛 Bug Fixes

- stop boundsObservable recursion when manually updated ([050d00c](https://github.com/phork/phorkit/commit/050d00c))

## [11.0.1](https://github.com/phork/phorkit/compare/v11.0.0...v11.0.1) (2021-11-10)

### ⚡ Performance Improvements

- replaced uuid with nanoid ([aeaad78](https://github.com/phork/phorkit/commit/aeaad78))

# [11.0.0](https://github.com/phork/phorkit/compare/v10.5.0...v11.0.0) (2021-11-09)

### ♻ Code Refactoring

- **major**: only allow ReactElement icon type in icon buttons ([382263d](https://github.com/phork/phorkit/commit/382263d))

### 🐛 Bug Fixes

- fix Select placeholder optionLabel type ([8a2eeb2](https://github.com/phork/phorkit/commit/8a2eeb2))

# [10.5.0](https://github.com/phork/phorkit/compare/v10.4.2...v10.5.0) (2021-11-04)

### ✨ Features

- added a confirmClose prop to the modals ([09dfd5e](https://github.com/phork/phorkit/commit/09dfd5e))
- added focusRing stylesheet ([219eb15](https://github.com/phork/phorkit/commit/219eb15))

## [10.4.2](https://github.com/phork/phorkit/compare/v10.4.1...v10.4.2) (2021-11-01)

### 👷 Build Changes

- added NPM publish workflow ([191d804](https://github.com/phork/phorkit/commit/191d804))

## [10.4.1](https://github.com/phork/phorkit/compare/v10.4.0...v10.4.1) (2021-10-31)

### ♻ Code Refactoring

- changed functional component return types ([74109b5](https://github.com/phork/phorkit/commit/74109b5))

# [10.4.0](https://github.com/phork/phorkit/compare/v10.3.0...v10.4.0) (2021-10-30)

### ✨ Features

- added 4xlarge Avatar size ([0c97ed7](https://github.com/phork/phorkit/commit/0c97ed7))

# [10.3.0](https://github.com/phork/phorkit/compare/v10.2.1...v10.3.0) (2021-10-30)

### ✨ Features

- added larger IconButton sizes ([a2b717a](https://github.com/phork/phorkit/commit/a2b717a))

## [10.2.1](https://github.com/phork/phorkit/compare/v10.2.0...v10.2.1) (2021-10-28)

### 🐛 Bug Fixes

- fixed the return type for the SizeProvider ([d5c78c2](https://github.com/phork/phorkit/commit/d5c78c2))

# [10.2.0](https://github.com/phork/phorkit/compare/v10.1.0...v10.2.0) (2021-10-26)

### ✨ Features

- added ButtonGroup wrap prop ([1cc7353](https://github.com/phork/phorkit/commit/1cc7353))
- allow unlabeled CheckboxGroup, RadioGroup ([bbc2f1f](https://github.com/phork/phorkit/commit/bbc2f1f))

### 🐛 Bug Fixes

- allow for partial translations ([b529fef](https://github.com/phork/phorkit/commit/b529fef))
- apply CheckboxGroup, RadioGroup styles to fieldset ([37cf6bc](https://github.com/phork/phorkit/commit/37cf6bc))
- apply Formbox style prop ([10430f9](https://github.com/phork/phorkit/commit/10430f9))

# [10.1.0](https://github.com/phork/phorkit/compare/v10.0.0...v10.1.0) (2021-10-22)

### ✨ Features

- added forwardRef to Typography ([a7e232e](https://github.com/phork/phorkit/commit/a7e232e))
- added neutral color to Typography ([44424bf](https://github.com/phork/phorkit/commit/44424bf))
- added StatusBubble component ([a3fbfc9](https://github.com/phork/phorkit/commit/a3fbfc9))
- added active, focused, hovered states to Button, Tag ([263172a](https://github.com/phork/phorkit/commit/263172a))
- added Shade component ([ed4dccb](https://github.com/phork/phorkit/commit/ed4dccb))
- improve Progress accessibility ([8c54639](https://github.com/phork/phorkit/commit/8c54639))

### 🐛 Bug Fixes

- fix formbox input colors ([5c03d7c](https://github.com/phork/phorkit/commit/5c03d7c))
- make themeId optional in colored components ([967dad7](https://github.com/phork/phorkit/commit/967dad7))

# [10.0.0](https://github.com/phork/phorkit/compare/v9.0.3...v10.0.0) (2021-10-19)

### ♻ Code Refactoring

- **major**: renamed `vertical` boolean prop to `orientation` ([785ff9d](https://github.com/phork/phorkit/commit/785ff9d))
- **major**: renamed useSizeListener props type ([4c21967](https://github.com/phork/phorkit/commit/4c21967))
- **major**: replace useClickAndEscape with useHandleClickOutside and useHandleEscape ([dc40ec5](https://github.com/phork/phorkit/commit/dc40ec5))
- **major**: update Banner, Modal, Toast types and most return types ([488c9e8](https://github.com/phork/phorkit/commit/488c9e8))
- **major**: updated hooks interface names ([fc86a8b](https://github.com/phork/phorkit/commit/fc86a8b))
- **major**: updated Size and TextboxGroup hook prop type names ([80aaf15](https://github.com/phork/phorkit/commit/80aaf15))
- **major**: changed component props from interfaces to types ([e7da767](https://github.com/phork/phorkit/commit/e7da767))
- **major**: changed minimal List color to neutral ([a2ed810](https://github.com/phork/phorkit/commit/a2ed810))
- **major**: rename Pagination props, add allowRightClickLinks feature ([7d798f4](https://github.com/phork/phorkit/commit/7d798f4))
- **major**: renamed ControlledDropdown to Dropdown and Dropdown to PartialDropdown ([293f500](https://github.com/phork/phorkit/commit/293f500))
- **major**: renamed focusType to eventType in Accessibility context ([e2c9a5a](https://github.com/phork/phorkit/commit/e2c9a5a))
- **major**: renamed Portal and Popover parentRef to relativeRef ([7564adb](https://github.com/phork/phorkit/commit/7564adb))
- **major**: renamed UncontrolledInteractive[Group|List] to PartialInteractive[Group|List] ([c9dd61d](https://github.com/phork/phorkit/commit/c9dd61d))
- **major**: updated Banner, Modal and Toast onClose ([5e0cc01](https://github.com/phork/phorkit/commit/5e0cc01))
- **major**: updated Tag component to use children not label ([5cda370](https://github.com/phork/phorkit/commit/5cda370))
- added generic ref types to Popover, Tooltip, Dropover ([c5fe8b6](https://github.com/phork/phorkit/commit/c5fe8b6))
- added types for config files ([fd30b97](https://github.com/phork/phorkit/commit/fd30b97))
- omit unnecessary theme types from styled components ([67f9a6a](https://github.com/phork/phorkit/commit/67f9a6a))
- only highlight focused items if component is focused ([5552674](https://github.com/phork/phorkit/commit/5552674))
- removed `withChildrenProps` from Popover ([e830e3d](https://github.com/phork/phorkit/commit/e830e3d))
- updated EventListener hooks ([e0ca445](https://github.com/phork/phorkit/commit/e0ca445))
- set several Pagination default props ([2ccb989](https://github.com/phork/phorkit/commit/2ccb989))
- updated Button and Tag hover and active states ([42bf138](https://github.com/phork/phorkit/commit/42bf138))
- changed all array prop types to be readonly ([0637aba](https://github.com/phork/phorkit/commit/0637aba))
- standardize all focus rings, use mixins ([763852b](https://github.com/phork/phorkit/commit/763852b))

### ✨ Features

- added contrast Pagination ([e59e27c](https://github.com/phork/phorkit/commit/e59e27c))
- added custom tag option to DropdownWithTags ([61c634c](https://github.com/phork/phorkit/commit/61c634c))
- added display prop to ButtonGroup ([563b9f5](https://github.com/phork/phorkit/commit/563b9f5))
- added loaderReplaceIcon option to IconTextButton ([1bb2c46](https://github.com/phork/phorkit/commit/1bb2c46))
- added useScrollSync hook ([dbab06e](https://github.com/phork/phorkit/commit/dbab06e))
- added ScrollSync component ([3930cde](https://github.com/phork/phorkit/commit/3930cde))
- added StyledTextbox and StyledPassword components ([8492311](https://github.com/phork/phorkit/commit/8492311))
- added StyledChip component ([d57a7ac](https://github.com/phork/phorkit/commit/d57a7ac))
- moved Looper from docs helper to component ([b7aa572](https://github.com/phork/phorkit/commit/b7aa572))

### 📝 Storybook

- added Accessibility stories ([32ef70e](https://github.com/phork/phorkit/commit/32ef70e))
- added Accordion stories ([620288f](https://github.com/phork/phorkit/commit/620288f))
- added Avatar stories ([89a07f0](https://github.com/phork/phorkit/commit/89a07f0))
- added Badge, Button, Card and Divider stories ([9236f97](https://github.com/phork/phorkit/commit/9236f97))
- added Banner stories ([1a0f221](https://github.com/phork/phorkit/commit/1a0f221))
- added Button docs ([f3cfe92](https://github.com/phork/phorkit/commit/f3cfe92))
- added Button stories ([d363faa](https://github.com/phork/phorkit/commit/d363faa))
- added ButtonGroup stories ([495936e](https://github.com/phork/phorkit/commit/495936e))
- added Checkbox, Radio stories ([86cdea6](https://github.com/phork/phorkit/commit/86cdea6))
- added Chip stories ([d57a7ac](https://github.com/phork/phorkit/commit/d57a7ac))
- added ColoredAvatar and StyledAvatar stories ([f352102](https://github.com/phork/phorkit/commit/f352102))
- added Dropdown stories ([4486865](https://github.com/phork/phorkit/commit/4486865))
- added DropdownWithTags stories ([eadddb2](https://github.com/phork/phorkit/commit/eadddb2))
- added Dropover stories ([f55464e](https://github.com/phork/phorkit/commit/f55464e))
- added Fieldset stories ([1bab593](https://github.com/phork/phorkit/commit/1bab593))
- added Flex stories ([35aaae7](https://github.com/phork/phorkit/commit/35aaae7))
- added Form stories ([924f85b](https://github.com/phork/phorkit/commit/924f85b))
- added Header and Footer stories ([b08f6e4](https://github.com/phork/phorkit/commit/b08f6e4))
- added Icon stories ([bd8a16d](https://github.com/phork/phorkit/commit/bd8a16d))
- added IconCount stories ([97ba884](https://github.com/phork/phorkit/commit/97ba884))
- added IconText stories ([edd5046](https://github.com/phork/phorkit/commit/edd5046))
- added Label stories ([07f1b14](https://github.com/phork/phorkit/commit/07f1b14))
- added LabelWrapper stories ([7da4b15](https://github.com/phork/phorkit/commit/7da4b15))
- added LineLoader stories ([3b93279](https://github.com/phork/phorkit/commit/3b93279))
- added Link stories ([e4e7fc9](https://github.com/phork/phorkit/commit/e4e7fc9))
- added LinkContainer stories ([3ab9f2f](https://github.com/phork/phorkit/commit/3ab9f2f))
- added List stories ([97a6155](https://github.com/phork/phorkit/commit/97a6155))
- added ListRegistry stories ([93abe06](https://github.com/phork/phorkit/commit/93abe06))
- added Loader stories ([368ee1f](https://github.com/phork/phorkit/commit/368ee1f))
- added Modal stories ([84ccf7f](https://github.com/phork/phorkit/commit/84ccf7f))
- added Navigation stories ([d6d9e92](https://github.com/phork/phorkit/commit/d6d9e92))
- added Notification stories ([dde94cb](https://github.com/phork/phorkit/commit/dde94cb))
- added Pagination stories ([949c19e](https://github.com/phork/phorkit/commit/949c19e))
- added Panel stories ([1f82050](https://github.com/phork/phorkit/commit/1f82050))
- added Paper stories ([ce8f40f](https://github.com/phork/phorkit/commit/ce8f40f))
- added Popover stories ([5bc7383](https://github.com/phork/phorkit/commit/5bc7383))
- added Position stories ([20e3a3d](https://github.com/phork/phorkit/commit/20e3a3d))
- added Progress stories ([d9ddb0e](https://github.com/phork/phorkit/commit/d9ddb0e))
- added Rhythm stories ([16fd06a](https://github.com/phork/phorkit/commit/16fd06a))
- added ScrollSync stories ([a9dcd2a](https://github.com/phork/phorkit/commit/a9dcd2a))
- added Select stories ([75c3d6a](https://github.com/phork/phorkit/commit/75c3d6a))
- added Size stories ([0cdce41](https://github.com/phork/phorkit/commit/0cdce41))
- added Slider stories ([d5e2561](https://github.com/phork/phorkit/commit/d5e2561))
- added Stepper stories ([6f6ff11](https://github.com/phork/phorkit/commit/6f6ff11))
- added StyledLabel stories ([2d720b2](https://github.com/phork/phorkit/commit/2d720b2))
- added Tabs stories ([bf81136](https://github.com/phork/phorkit/commit/bf81136))
- added Tag, TagGroup stories ([e85275e](https://github.com/phork/phorkit/commit/e85275e))
- added Textarea stories ([5747547](https://github.com/phork/phorkit/commit/5747547))
- added Textbox stories ([b2a3c8a](https://github.com/phork/phorkit/commit/b2a3c8a))
- added TextboxGroup stories ([09546c9](https://github.com/phork/phorkit/commit/09546c9))
- added Toast stories ([0828d5d](https://github.com/phork/phorkit/commit/0828d5d))
- added Toggle stories ([0ceb89f](https://github.com/phork/phorkit/commit/0ceb89f))
- added Tooltip stories ([55ca774](https://github.com/phork/phorkit/commit/55ca774))
- added Triangle stories ([a6bfa56](https://github.com/phork/phorkit/commit/a6bfa56))
- added Typography stories ([86a17aa](https://github.com/phork/phorkit/commit/86a17aa))

### 🐛 Bug Fixes

- **major**: rename StyledTitleToast to StyledTitledToast ([f6478c5](https://github.com/phork/phorkit/commit/f6478c5))
- don't require variant in Textarea component ([25e800b](https://github.com/phork/phorkit/commit/25e800b))
- fixed default Triangle size value ([225a5a9](https://github.com/phork/phorkit/commit/225a5a9))
- fixed LineLoader aria attributes ([1c9443d](https://github.com/phork/phorkit/commit/1c9443d))
- fixed playground credit card demo backspace ([a0930db](https://github.com/phork/phorkit/commit/a0930db))
- fixed tsconfig, eslintrc ([d6f477e](https://github.com/phork/phorkit/commit/d6f477e))
- improve navigation hover states for selected items ([56127bd](https://github.com/phork/phorkit/commit/56127bd))
- pass isTooltip flag from Tooltip to Popover ([e7557dd](https://github.com/phork/phorkit/commit/e7557dd))
- removed inherited Paper types from Banner ([85bffcd](https://github.com/phork/phorkit/commit/85bffcd))
- removed unused unthemed prop from TagGroup ([0bddc18](https://github.com/phork/phorkit/commit/0bddc18))
- hide focused Paper outline unless accessible ([d3240bc](https://github.com/phork/phorkit/commit/d3240bc))

## [9.0.3](https://github.com/phork/phorkit/compare/v9.0.2...v9.0.3) (2021-07-30)

### 🐛 Bug Fixes

- typography missing 2xsmall ([126b66a](https://github.com/phork/phorkit/commit/126b66a))

## [9.0.2](https://github.com/phork/phorkit/compare/v9.0.1...v9.0.2) (2021-07-30)

### 🐛 Bug Fixes

- remove nbsp from textbox ([e4a905d](https://github.com/phork/phorkit/commit/e4a905d))

## [9.0.1](https://github.com/phork/phorkit/compare/v9.0.0...v9.0.1) (2021-07-16)

### 🐛 Bug Fixes

- fix size observer too many renders ([f95d41a](https://github.com/phork/phorkit/commit/f95d41a))

# [9.0.0](https://github.com/phork/phorkit/compare/v8.2.0...v9.0.0) (2021-07-16)

### ♻ Code Refactoring

- **major**: moved useThemeId from hooks into context folder ([f7b4173](https://github.com/phork/phorkit/commit/f7b4173))
- **major**: rename Width context to Size ([dd4cf96](https://github.com/phork/phorkit/commit/dd4cf96))
- **major**: replace useDimensions hook with useSizeListeners ([c273481](https://github.com/phork/phorkit/commit/c273481))
- **major**: spread remaining form props on inputs ([d29c44f](https://github.com/phork/phorkit/commit/d29c44f))
- **major**: spread remaining Select, Textarea props on input ([e9befe7](https://github.com/phork/phorkit/commit/e9befe7))
- **major**: standardized size names (eg. xxxl to 3xlarge) ([a02ae25](https://github.com/phork/phorkit/commit/a02ae25))
- minor tab improvements ([31d0ee7](https://github.com/phork/phorkit/commit/31d0ee7))
- update Checkbox, Radio types ([915f47e](https://github.com/phork/phorkit/commit/915f47e))
- updated eslint, prettier rules; lint mdx files ([eab8b28](https://github.com/phork/phorkit/commit/eab8b28))
- **major**: spread remaining Textbox props on input ([3e90258](https://github.com/phork/phorkit/commit/3e90258))

### ✨ Features

- added decimal places to size context ([57ce296](https://github.com/phork/phorkit/commit/57ce296))
- added size to checkbox, radio ([e6936f3](https://github.com/phork/phorkit/commit/e6936f3))
- added TextboxGroup component ([a884d09](https://github.com/phork/phorkit/commit/a884d09))
- added Width context ([0c871ad](https://github.com/phork/phorkit/commit/0c871ad))
- allow paste in 2FA input group ([bfe5989](https://github.com/phork/phorkit/commit/bfe5989))
- **major**: additional form input sizes ([678672e](https://github.com/phork/phorkit/commit/678672e))

### 🐛 Bug Fixes

- don't allow invalid input in 2FA form ([ec48d52](https://github.com/phork/phorkit/commit/ec48d52))
- formbox auto-complete respects size ([9be87b7](https://github.com/phork/phorkit/commit/9be87b7))
- formbox autofill transition no longer overwritten ([9bf72d8](https://github.com/phork/phorkit/commit/9bf72d8))
- improved styled components number or string checking ([ce6fe61](https://github.com/phork/phorkit/commit/ce6fe61))
- prevent invalid paste on textbox group ([1dda393](https://github.com/phork/phorkit/commit/1dda393))

# [8.2.0](https://github.com/phork/phorkit/compare/v8.1.0...v8.2.0) (2021-06-25)

### ✨ Features

- allow HTML in form labels ([028d280](https://github.com/phork/phorkit/commit/028d280))

### 🐛 Bug Fixes

- update form input auto-fill colors ([d8d6db9](https://github.com/phork/phorkit/commit/d8d6db9))

# [8.1.0](https://github.com/phork/phorkit/compare/v8.0.0...v8.1.0) (2021-06-24)

### ✨ Features

- added autoFill styles for select, textarea ([b3bbe92](https://github.com/phork/phorkit/commit/b3bbe92))
- added autoFill styles for textbox inputs ([5dbf496](https://github.com/phork/phorkit/commit/5dbf496))
- added fancy textbox ([276401a](https://github.com/phork/phorkit/commit/276401a))

### 🐛 Bug Fixes

- textbox with formatting is tabbable ([a3556c1](https://github.com/phork/phorkit/commit/a3556c1))

# [8.0.0](https://github.com/phork/phorkit/compare/v7.2.0...v8.0.0) (2021-06-19)

### ♻ Code Refactoring

- **major**: refactored icon text button component ([80eea5a](https://github.com/phork/phorkit/commit/80eea5a))

### ✨ Features

- new removeScrollbar CSS mixin ([b319dc6](https://github.com/phork/phorkit/commit/b319dc6))

# [7.2.0](https://github.com/phork/phorkit/compare/v7.1.3...v7.2.0) (2021-06-16)

### ✨ Features

- added notified dropdown components ([93fb1fe](https://github.com/phork/phorkit/commit/93fb1fe))

### 🐛 Bug Fixes

- totally hide dropdown scrollbar ([28f59f6](https://github.com/phork/phorkit/commit/28f59f6))

## [7.1.3](https://github.com/phork/phorkit/compare/v7.1.2...v7.1.3) (2021-06-16)

### 🐛 Bug Fixes

- pass correct close function to popover children ([2592c07](https://github.com/phork/phorkit/commit/2592c07))

## [7.1.2](https://github.com/phork/phorkit/compare/v7.1.1...v7.1.2) (2021-06-15)

### 🐛 Bug Fixes

- fix interactive list allow reselect ([f86aaaf](https://github.com/phork/phorkit/commit/f86aaaf))

## [7.1.1](https://github.com/phork/phorkit/compare/v7.1.0...v7.1.1) (2021-05-28)

### 🐛 Bug Fixes

- position changed to flexbox with alignment ([55e0d82](https://github.com/phork/phorkit/commit/55e0d82))

# [7.1.0](https://github.com/phork/phorkit/compare/v7.0.1...v7.1.0) (2021-05-27)

### ♻ Code Refactoring

- update useThemeId import paths ([501b62a](https://github.com/phork/phorkit/commit/501b62a))

### ✨ Features

- allow custom password icon sizes ([e37fdba](https://github.com/phork/phorkit/commit/e37fdba))

### 🐛 Bug Fixes

- debounced dropdown search ([8ecf379](https://github.com/phork/phorkit/commit/8ecf379))

## [7.0.1](https://github.com/phork/phorkit/compare/v7.0.0...v7.0.1) (2021-05-26)

### ♻ Code Refactoring

- update tabs flex styles ([830b9c1](https://github.com/phork/phorkit/commit/830b9c1))

### 🐛 Bug Fixes

- remove errant semi-colon (fixes tabs) ([82ce3be](https://github.com/phork/phorkit/commit/82ce3be))

# [7.0.0](https://github.com/phork/phorkit/compare/v6.2.0...v7.0.0) (2021-05-26)

### ♻ Code Refactoring

- **major**: interactive group, interactive list, dropdown ([8fb8659](https://github.com/phork/phorkit/commit/8fb8659))
- **major**: refactored formbox and dropdown ([cfc9772](https://github.com/phork/phorkit/commit/cfc9772))

### 🐛 Bug Fixes

- form input tab index fixes ([0b97725](https://github.com/phork/phorkit/commit/0b97725))
- minor dropdown focus fixes ([11b20b4](https://github.com/phork/phorkit/commit/11b20b4))
- withTheme displayName ([8b08633](https://github.com/phork/phorkit/commit/8b08633))

# [6.2.0](https://github.com/phork/phorkit/compare/v6.1.3...v6.2.0) (2021-05-16)

### ✨ Features

- add more customization options to DropdownWithTags ([ac3c710](https://github.com/phork/phorkit/commit/ac3c710))

### 🐛 Bug Fixes

- add tabIndex to formbox actionable icons ([cce9641](https://github.com/phork/phorkit/commit/cce9641))

## [6.1.3](https://github.com/phork/phorkit/compare/v6.1.2...v6.1.3) (2021-05-14)

### ♻ Code Refactoring

- move focus event from list component to dropdown ([fbd2fa9](https://github.com/phork/phorkit/commit/fbd2fa9))

### 🐛 Bug Fixes

- fix dropdown focus styles and click to close jumpiness ([04decee](https://github.com/phork/phorkit/commit/04decee))

## [6.1.2](https://github.com/phork/phorkit/compare/v6.1.1...v6.1.2) (2021-05-13)

### ♻ Code Refactoring

- update small, xsmall scrollbar styles to use mixin ([468d944](https://github.com/phork/phorkit/commit/468d944))

### 🐛 Bug Fixes

- hide accessible slider handle when not focused ([dccfd98](https://github.com/phork/phorkit/commit/dccfd98))
- remove unnecessary accessibility check from multi color slider ([04ec2c6](https://github.com/phork/phorkit/commit/04ec2c6))

## [6.1.1](https://github.com/phork/phorkit/compare/v6.1.0...v6.1.1) (2021-05-13)

### ♻ Code Refactoring

- improve dropdown clear callback, update displayNames ([f154e18](https://github.com/phork/phorkit/commit/f154e18))

### 🐛 Bug Fixes

- update DropdownWithTags focus on tag remove ([7d32ea3](https://github.com/phork/phorkit/commit/7d32ea3))

# [6.1.0](https://github.com/phork/phorkit/compare/v6.0.0...v6.1.0) (2021-05-12)

### ✨ Features

- allow custom tooltip triangle sizes and offsets ([07f2c4b](https://github.com/phork/phorkit/commit/07f2c4b))

# [6.0.0](https://github.com/phork/phorkit/compare/v5.0.0...v6.0.0) (2021-05-12)

### ♻ Code Refactoring

- **major**: refactored popover, tooltip, dropover, and renderFromProp ([15b5e25](https://github.com/phork/phorkit/commit/15b5e25))
- remove accessible checkbox, radio focus style ([22739aa](https://github.com/phork/phorkit/commit/22739aa))
- remove default pagination page label styles ([cf13ad1](https://github.com/phork/phorkit/commit/cf13ad1))
- remove renderFromProp from Modal ([880238d](https://github.com/phork/phorkit/commit/880238d))
- update modal spacing ([649e35d](https://github.com/phork/phorkit/commit/649e35d))
- update toggle focus styles ([5f57b41](https://github.com/phork/phorkit/commit/5f57b41))
- use ghost button for modal close ([28d813c](https://github.com/phork/phorkit/commit/28d813c))

### ✨ Features

- redesigned pagination ([ca2f6e4](https://github.com/phork/phorkit/commit/ca2f6e4))

# [5.0.0](https://github.com/phork/phorkit/compare/v4.0.0...v5.0.0) (2021-05-08)

### ♻ Code Refactoring

- improve scrollbars ([df9d5ab](https://github.com/phork/phorkit/commit/df9d5ab))
- **major**: refactored and renamed button and tag variants ([df225f7](https://github.com/phork/phorkit/commit/df225f7))
- change filled button hover color ([f037874](https://github.com/phork/phorkit/commit/f037874))

### ✨ Features

- added Chip component ([d255f08](https://github.com/phork/phorkit/commit/d255f08))
- added colored avatar ([a5e4f7e](https://github.com/phork/phorkit/commit/a5e4f7e))
- added secondary variants to checkbox, radio ([1eacf5e](https://github.com/phork/phorkit/commit/1eacf5e))

### 🐛 Bug Fixes

- improve badge radius ([e1d5be2](https://github.com/phork/phorkit/commit/e1d5be2))
- make header and footer inflexible ([d793a8e](https://github.com/phork/phorkit/commit/d793a8e))
- remove right margin from selectors without children ([a1b2b48](https://github.com/phork/phorkit/commit/a1b2b48))

# [4.0.0](https://github.com/phork/phorkit/compare/v3.3.0...v4.0.0) (2021-05-05)

### ♻ Code Refactoring

- **major**: rename Tags component to Tag ([48d5850](https://github.com/phork/phorkit/commit/48d5850))

### ✨ Features

- added badge pulsing animation ([a22e8c4](https://github.com/phork/phorkit/commit/a22e8c4))
- added pill textbox, unthemed dropdown ([60e49b3](https://github.com/phork/phorkit/commit/60e49b3))
- refactored tags, added variants ([3cc15ce](https://github.com/phork/phorkit/commit/3cc15ce))

### 🐛 Bug Fixes

- improve button color transitions ([4d604cc](https://github.com/phork/phorkit/commit/4d604cc))
- improve formbox transitions ([c90c29b](https://github.com/phork/phorkit/commit/c90c29b))

# [3.3.0](https://github.com/phork/phorkit/compare/v3.2.3...v3.3.0) (2021-05-04)

### ✨ Features

- vertical progress bar, form fill colors, refactoring ([bb53d5d](https://github.com/phork/phorkit/commit/bb53d5d))

### 🐛 Bug Fixes

- progress bar orientation should be optional ([7163b54](https://github.com/phork/phorkit/commit/7163b54))

## [3.2.3](https://github.com/phork/phorkit/compare/v3.2.2...v3.2.3) (2021-05-03)

### 🐛 Bug Fixes

- fix button group full width ([704f2ce](https://github.com/phork/phorkit/commit/704f2ce))

## [3.2.2](https://github.com/phork/phorkit/compare/v3.2.1...v3.2.2) (2021-05-03)

### ♻ Code Refactoring

- add side padding to xsmall modals ([f6cf2b7](https://github.com/phork/phorkit/commit/f6cf2b7))

### 🐛 Bug Fixes

- fix modal media queries ([8b40def](https://github.com/phork/phorkit/commit/8b40def))

## [3.2.1](https://github.com/phork/phorkit/compare/v3.2.0...v3.2.1) (2021-05-03)

### 🐛 Bug Fixes

- omit css, sx from merge element props types ([d6f0ecc](https://github.com/phork/phorkit/commit/d6f0ecc))

# [3.2.0](https://github.com/phork/phorkit/compare/v3.1.0...v3.2.0) (2021-05-02)

### ♻ Code Refactoring

- renamed list outline, variant props ([e7b3428](https://github.com/phork/phorkit/commit/e7b3428))

### ✨ Features

- added [@media](https://github.com/media) queries for paper, modal responsiveness ([2679e8e](https://github.com/phork/phorkit/commit/2679e8e))

### 🐛 Bug Fixes

- add border radius to navigation and unselected nav items ([6153491](https://github.com/phork/phorkit/commit/6153491))
- allow button to override button group click event ([adff7f3](https://github.com/phork/phorkit/commit/adff7f3))
- use transparent color for unchecked checkboxes, radio buttons ([720a97b](https://github.com/phork/phorkit/commit/720a97b))

# [3.1.0](https://github.com/phork/phorkit/compare/v3.0.0...v3.1.0) (2021-04-30)

### ♻ Code Refactoring

- updated slider hover and focus styles ([e96a1fa](https://github.com/phork/phorkit/commit/e96a1fa))

### ✨ Features

- added divided button group ([07e7a59](https://github.com/phork/phorkit/commit/07e7a59))

### 🐛 Bug Fixes

- add hidden border to text buttons so they behave the same ([945c059](https://github.com/phork/phorkit/commit/945c059))

# [3.0.0](https://github.com/phork/phorkit/compare/v2.0.2...v3.0.0) (2021-04-26)

### ♻ Code Refactoring

- improve tooltip focus and focus return ([a4345de](https://github.com/phork/phorkit/commit/a4345de))

### ✨ Features

- **major**: renamed button text to inline, new text button styles ([2056790](https://github.com/phork/phorkit/commit/2056790))
- added new styled divider ([d58fb18](https://github.com/phork/phorkit/commit/d58fb18))
- added new styled label ([d62b21b](https://github.com/phork/phorkit/commit/d62b21b))
- updated button colors ([9553bed](https://github.com/phork/phorkit/commit/9553bed))

### 🐛 Bug Fixes

- correct order of rhythm rules ([880336a](https://github.com/phork/phorkit/commit/880336a))
- force styled component colors to be defined ([14bd1d9](https://github.com/phork/phorkit/commit/14bd1d9))
- remove theme from styled loader ([243d3bb](https://github.com/phork/phorkit/commit/243d3bb))
- text tooltip styled paper scrollbar color ([57eb730](https://github.com/phork/phorkit/commit/57eb730))

## [2.0.2](https://github.com/phork/phorkit/compare/v2.0.1...v2.0.2) (2021-04-25)

### 🐛 Bug Fixes

- clicking an open dropdown closes it ([ada0407](https://github.com/phork/phorkit/commit/ada0407))

## [2.0.1](https://github.com/phork/phorkit/compare/v2.0.0...v2.0.1) (2021-04-23)

### 🐛 Bug Fixes

- remove automatically added dark card lightener ([b803b6f](https://github.com/phork/phorkit/commit/b803b6f))

# [2.0.0](https://github.com/phork/phorkit/compare/v1.17.0...v2.0.0) (2021-04-23)

### 💥 Breaking Changes

- removed card children components ([#1](https://github.com/phork/phorkit/pull/1)) ([daf5eb7](https://github.com/phork/phorkit/commit/daf5eb7))

### ✨ Features

- refactored color palettes ([#1](https://github.com/phork/phorkit/pull/1)) ([daf5eb7](https://github.com/phork/phorkit/commit/daf5eb7))

# [1.17.0](https://github.com/phork/phorkit/compare/v1.16.2...v1.17.0) (2021-04-21)

### ✨ Features

- page banner colors, accessibility demo ([c0f32de](https://github.com/phork/phorkit/commit/c0f32de))

## [1.16.2](https://github.com/phork/phorkit/compare/v1.16.1...v1.16.2) (2021-04-20)

### 🐛 Bug Fixes

- stack panel styles ([6b9fe9b](https://github.com/phork/phorkit/commit/6b9fe9b))

## [1.16.1](https://github.com/phork/phorkit/compare/v1.16.0...v1.16.1) (2021-04-20)

### 🐛 Bug Fixes

- improve dark card shadows ([67218ad](https://github.com/phork/phorkit/commit/67218ad))

# [1.16.0](https://github.com/phork/phorkit/compare/v1.15.3...v1.16.0) (2021-04-20)

### ✨ Features

- refactored modal, added xlarge size ([b864782](https://github.com/phork/phorkit/commit/b864782))
- updated dark box shadows, removed raised header and footer ([63b2c9a](https://github.com/phork/phorkit/commit/63b2c9a))

### 🐛 Bug Fixes

- prettier import order ([d979104](https://github.com/phork/phorkit/commit/d979104))

## [1.15.3](https://github.com/phork/phorkit/compare/v1.15.2...v1.15.3) (2021-04-19)

### 🐛 Bug Fixes

- disable typography style minification ([97b8b3d](https://github.com/phork/phorkit/commit/97b8b3d))

## [1.15.2](https://github.com/phork/phorkit/compare/v1.15.1...v1.15.2) (2021-04-18)

### 🐛 Bug Fixes

- added missing displayName prop to all components ([052bcd7](https://github.com/phork/phorkit/commit/052bcd7))

## [1.15.1](https://github.com/phork/phorkit/compare/v1.15.0...v1.15.1) (2021-04-18)

### 🐛 Bug Fixes

- fix styled toasts future emotion component [skip ci] ([89899e8](https://github.com/phork/phorkit/commit/89899e8))

# [1.15.0](https://github.com/phork/phorkit/compare/v1.14.0...v1.15.0) (2021-04-18)

### ✨ Features

- added quiet header and footer borders ([47a43bb](https://github.com/phork/phorkit/commit/47a43bb))

### 🐛 Bug Fixes

- remove emotion from styled toasts to fix infinite loop ([32e6dd5](https://github.com/phork/phorkit/commit/32e6dd5))

# [1.14.0](https://github.com/phork/phorkit/compare/v1.13.0...v1.14.0) (2021-04-17)

### ✨ Features

- added IconToast component ([ddf835d](https://github.com/phork/phorkit/commit/ddf835d))
- added more primary color shades ([db4912f](https://github.com/phork/phorkit/commit/db4912f))
- added StyledToast and StyledIconToast components ([26e9b31](https://github.com/phork/phorkit/commit/26e9b31))

### 🐛 Bug Fixes

- don't pass style props from styled button to button ([99aefd0](https://github.com/phork/phorkit/commit/99aefd0))

# [1.13.0](https://github.com/phork/phorkit/compare/v1.12.0...v1.13.0) (2021-04-15)

### ✨ Features

- publish additional standalone styles ([a3d5bf3](https://github.com/phork/phorkit/commit/a3d5bf3))

# [1.12.0](https://github.com/phork/phorkit/compare/v1.11.0...v1.12.0) (2021-04-14)

### ✨ Features

- accept custom banner styles ([33110ee](https://github.com/phork/phorkit/commit/33110ee))

# [1.11.0](https://github.com/phork/phorkit/compare/v1.10.0...v1.11.0) (2021-04-13)

### ✨ Features

- new success inputs, removed label validity colors ([b93049d](https://github.com/phork/phorkit/commit/b93049d))

# [1.10.0](https://github.com/phork/phorkit/compare/v1.9.0...v1.10.0) (2021-04-13)

### ♻ Code Refactoring

- broke out context from toasts, modals and banners ([dad53bd](https://github.com/phork/phorkit/commit/dad53bd))

### ✨ Features

- change header and footer borders to non-pseudo element ([406a353](https://github.com/phork/phorkit/commit/406a353))

# [1.9.0](https://github.com/phork/phorkit/compare/v1.8.0...v1.9.0) (2021-04-12)

### ✨ Features

- additional avatar sizes ([8010efe](https://github.com/phork/phorkit/commit/8010efe))

### 🐛 Bug Fixes

- improve focus and hover for slider and toggle ([283e751](https://github.com/phork/phorkit/commit/283e751))

# [1.8.0](https://github.com/phork/phorkit/compare/v1.7.1...v1.8.0) (2021-04-08)

### ✨ Features

- standardized element sizes, docs helpers to ts ([df82808](https://github.com/phork/phorkit/commit/df82808))

## [1.7.1](https://github.com/phork/phorkit/compare/v1.7.0...v1.7.1) (2021-04-07)

### ♻ Code Refactoring

- added types to withNotification ([9c172bb](https://github.com/phork/phorkit/commit/9c172bb))

### 🐛 Bug Fixes

- lighten up dark neutral color ([42b5168](https://github.com/phork/phorkit/commit/42b5168))
- update withNotification types ([c342244](https://github.com/phork/phorkit/commit/c342244))

# [1.7.0](https://github.com/phork/phorkit/compare/v1.6.0...v1.7.0) (2021-04-07)

### ✨ Features

- added colored buttons, icon buttons and icon text buttons ([2ef4cd3](https://github.com/phork/phorkit/commit/2ef4cd3))
- added reverse icon text buttons, restored neutralAndPrimary ([870fa10](https://github.com/phork/phorkit/commit/870fa10))

# [1.6.0](https://github.com/phork/phorkit/compare/v1.5.1...v1.6.0) (2021-04-06)

### ♻ Code Refactoring

- break up PostCSS mixins into multiple files ([4a74d25](https://github.com/phork/phorkit/commit/4a74d25))

### ✨ Features

- refactored button styles, added button sizes ([7c1e05c](https://github.com/phork/phorkit/commit/7c1e05c))

### 🐛 Bug Fixes

- button group size optional ([8cc4526](https://github.com/phork/phorkit/commit/8cc4526))

## [1.5.1](https://github.com/phork/phorkit/compare/v1.5.0...v1.5.1) (2021-04-05)

### ♻ Code Refactoring

- added AsType, allow "as" to be functional component ([7c2f097](https://github.com/phork/phorkit/commit/7c2f097))

### 🐛 Bug Fixes

- only prevent keydown on navigation link enter ([2c6886e](https://github.com/phork/phorkit/commit/2c6886e))

# [1.5.0](https://github.com/phork/phorkit/compare/v1.4.0...v1.5.0) (2021-04-05)

### ♻ Code Refactoring

- minor props order adjustments ([37c4a03](https://github.com/phork/phorkit/commit/37c4a03))

### ✨ Features

- add allowRightClickLinks to int. list, navigation ([34fe90c](https://github.com/phork/phorkit/commit/34fe90c))

# [1.4.0](https://github.com/phork/phorkit/compare/v1.3.0...v1.4.0) (2021-04-04)

### ✨ Features

- added IconCount component ([abe1d97](https://github.com/phork/phorkit/commit/abe1d97))

### 🐛 Bug Fixes

- fix reverse IconCount spacing ([f0f7ba0](https://github.com/phork/phorkit/commit/f0f7ba0))

# [1.3.0](https://github.com/phork/phorkit/compare/v1.2.0...v1.3.0) (2021-03-31)

### ✨ Features

- improved icon text buttons, more button spacing options ([bb501d7](https://github.com/phork/phorkit/commit/bb501d7))

# [1.2.0](https://github.com/phork/phorkit/compare/v1.1.0...v1.2.0) (2021-03-31)

### ✨ Features

- added blackout rounded typography ([a546fd1](https://github.com/phork/phorkit/commit/a546fd1))
- added rounded and transparent lists ([4d5060c](https://github.com/phork/phorkit/commit/4d5060c))

### 🐛 Bug Fixes

- only pass extra popover toggler props if requested ([24d759e](https://github.com/phork/phorkit/commit/24d759e))

# [1.1.0](https://github.com/phork/phorkit/compare/v1.0.0...v1.1.0) (2021-03-30)

### ✨ Features

- increased size of checkboxes, radio buttons, fonts ([fd4d3ce](https://github.com/phork/phorkit/commit/fd4d3ce))

### 🐛 Bug Fixes

- dark theme card borders and shadows ([c445b73](https://github.com/phork/phorkit/commit/c445b73))
- decrease button line height ([bcb3e99](https://github.com/phork/phorkit/commit/bcb3e99))
- floating progress bar ([ab1ef06](https://github.com/phork/phorkit/commit/ab1ef06))
- include visible in popover toggler props ([7d05917](https://github.com/phork/phorkit/commit/7d05917))

# 1.0.0 (2021-03-29)

### ✨ Features

- initial public commit ([3d5862c](https://github.com/phork/phorkit/commit/3d5862c))
