/**
 * This mixin is used to build out the 4 different types of
 * component fills.
 *
 * Solid: An opaque background color with the same color used for the
 *  border so that it won't jump around when changing fills. This
 *  needs a separate text color. On hover a solid fill should change
 *  to an opacity of .8.
 *
 * Shaded: A semi-transparent background applied with the :before
 *  pseudo-element, and a solid border. This uses a single color
 *  for the background, border and text. On hover a shaded fill
 *  should transition to a solid fill.
 *
 * Outlined: A transparent background and a solid border. This uses
 *  a single color for the border and text. On hover an outlined
 *  fill should transition to a shaded fill.
 *
 * Ghost: A transparent background and border. This inly uses the
 *  color for the text. On hover a ghost fill should transition to
 *  a shaded fill without a border.
 *
 * Each element can also be actionable. This means they should have
 * a focus ring applied on :focus.
 */

// this is a simple internal-use-only function
const makeFillerColors = (backgroundColor, borderColor, color) => ({
  backgroundColor,
  border: `1px solid ${borderColor}`,
  color,
});

// the component must be relative so the shade can be positioned
const makeFillerBase = () => ({
  position: 'relative',
});

// this includes all the possible transitions for the element
const makeFillerTransitions = () => ({
  transitionProperty: 'background-color, border-color, color, opacity',
  transitionTimingFunction: 'ease',
  transitionDuration: '150ms',
});

/**
 * This sets up the :after content for the focus ring
 * but doesn't actually show the ring. This is just
 * to prepare a focus ring that can be transitioned to.
 * To show the focus ring use the `makeFocusRing` Filler
 * below.
 */
const prepareFocusRing = () => ({
  '&:after': {
    borderRadius: 'inherit',
    bottom: 0,
    boxShadow: '0 0 0 0 transparent',
    content: '""',
    left: 0,
    opacity: 0.3,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'box-shadow 150ms ease',
  },
});

const makeFocusRing = (mixin, primaryColor) => ({
  '&:after': {
    boxShadow: `0 0 0 4px ${primaryColor}`,
  },
});

/**
 * This sets up the :before content for the shade
 * but doesn't actually show the shade. This is just
 * to prepare a shade that be transitioned to. To
 * show the shade use the `makeShade` function below.
 *
 * If the shade should replicate a border as well
 * then it should be positioned at -1px in each
 * direction.
 */
const prepareShade = (mixin, withBorder) => ({
  '&:before': {
    backgroundColor: 'transparent',
    borderRadius: 'inherit',
    bottom: withBorder ? '-1px' : 0,
    content: '""',
    left: withBorder ? '-1px' : 0,
    opacity: 0.1,
    pointerEvents: 'none',
    position: 'absolute',
    right: withBorder ? '-1px' : 0,
    top: withBorder ? '-1px' : 0,
    transition: 'background-color 150ms ease',
  },
});

// this is used to show a prepared shade
const makeShade = (mixin, primaryColor) => ({
  '&:before': {
    backgroundColor: primaryColor,
  },
});

// this is necessary so that makeShade's :after doesn't overwrite prepareShade's
const prepareAndMakeShade = (mixin, primaryColor, withBorder) => ({
  '&:before': {
    ...Object.values(prepareShade(mixin, withBorder))[0],
    ...Object.values(makeShade(mixin, primaryColor))[0],
  },
});

/**
 * Start the complete fill methods
 */

const makeSolidFill = (mixin, primaryColor, inverseColor, shouldPrepareShade) => ({
  ...makeFillerColors(primaryColor, primaryColor, inverseColor),
  ...(shouldPrepareShade ? prepareShade() : {}),
});

const makeSolidFillHover = () => ({
  opacity: 0.9,
});

// shouldPrepareShade is still needed here in case this is used in something that already has a prepared shade
const makeShadedFill = (mixin, primaryColor, shouldPrepareShade) => ({
  ...makeFillerColors('transparent', primaryColor, primaryColor),
  ...(shouldPrepareShade ? prepareAndMakeShade(mixin, primaryColor) : makeShade(mixin, primaryColor)),
});

const makeShadedFillHover = (mixin, primaryColor, inverseColor) => ({
  ...makeFillerColors(primaryColor, primaryColor, inverseColor),
});

const makeOutlinedFill = (mixin, primaryColor, shouldPrepareShade) => ({
  ...makeFillerColors('transparent', primaryColor, primaryColor),
  ...(shouldPrepareShade ? prepareShade() : {}),
});

// a shade should have been prepared for this already so that it can transition
const makeOutlinedFillHover = (mixin, primaryColor) => ({
  ...makeShade(mixin, primaryColor),
});

const makeGhostFill = (mixin, primaryColor, shouldPrepareShade) => ({
  ...makeFillerColors('transparent', 'transparent', primaryColor),
  ...(shouldPrepareShade ? prepareShade(mixin, true) : {}),
});

// a shade should have been prepared for this already sp that it can transition
const makeGhostFillHover = (mixin, primaryColor) => ({
  ...makeShade(mixin, primaryColor),
});

const mixins = {
  // partial helper mixins
  makeFillerBase,
  makeFillerTransitions,
  prepareFocusRing,
  makeFocusRing,
  prepareShade,
  makeShade,
  prepareAndMakeShade,

  // complete fill mixins
  makeSolidFill,
  makeSolidFillHover,
  makeShadedFill,
  makeShadedFillHover,
  makeOutlinedFill,
  makeOutlinedFillHover,
  makeGhostFill,
  makeGhostFillHover,
};

module.exports = mixins;
