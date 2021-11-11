/**
 * This mixin is used to build out the 4 different types of
 * component fills.
 *
 * Solid: An opaque background color with the same color used for the
 *  border so that it won't jump around when changing fills. This
 *  needs a separate text color. On hover only the color should
 *  change, but that is not handled by this mixin.
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
 * Ghost: A transparent background and border. This only uses the
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
 * To show the focus ring use the `makeFocusRing` mixin
 * below.
 */
const prepareFocusRing = (mixin, offset = 0) => ({
  '&:after': {
    borderRadius: 'inherit',
    bottom: offset,
    boxShadow: '0 0 0 0 transparent',
    content: '""',
    left: offset,
    opacity: 0.2,
    pointerEvents: 'none',
    position: 'absolute',
    right: offset,
    top: offset,
    transition: 'box-shadow 150ms ease',
  },
});

const makeFocusRing = (mixin, primaryColor, size = '4px') => ({
  '&:after': {
    boxShadow: `0 0 0 ${size} ${primaryColor}`,
  },
});

// this replaces the opacity of the focus ring (eg. for active, hover effects)
const setFocusRingOpacity = (mixin, opacity) => ({
  '&:after': {
    opacity,
  },
});

/**
 * This sets up the :before content for the shade
 * but doesn't actually show the shade. This is just
 * to prepare a shade that be transitioned to. To
 * show the shade use the `makeShade` mixin below.
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

// this is necessary so that makeShade's :before doesn't overwrite prepareShade's
const prepareAndMakeShade = (mixin, primaryColor, withBorder) => ({
  '&:before': {
    ...Object.values(prepareShade(mixin, withBorder))[0],
    ...Object.values(makeShade(mixin, primaryColor))[0],
  },
});

// this replaces the opacity of the shade (eg. for active, hover effects)
const setShadeOpacity = (mixin, opacity) => ({
  '&:before': {
    opacity,
  },
});

/**
 * Start the complete fill methods
 */

const makeSolidFill = (mixin, primaryColor, inverseColor, shouldPrepareShade) => ({
  ...makeFillerColors(primaryColor, primaryColor, inverseColor),
  ...(shouldPrepareShade ? prepareShade() : {}),
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

// a shade should have been prepared for this already so that it can transition
const makeOutlinedFillActive = (mixin, primaryColor) => ({
  ...makeShade(mixin, primaryColor),
  ...setShadeOpacity(mixin, 0.1),
});

const makeGhostFill = (mixin, primaryColor, shouldPrepareShade) => ({
  ...makeFillerColors('transparent', 'transparent', primaryColor),
  ...(shouldPrepareShade ? prepareShade(mixin, true) : {}),
});

// a shade should have been prepared for this already so that it can transition
const makeGhostFillHover = (mixin, primaryColor) => ({
  ...makeShade(mixin, primaryColor),
});

// a shade should have been prepared for this already so that it can transition
const makeGhostFillActive = (mixin, primaryColor) => ({
  ...makeShade(mixin, primaryColor),
  ...setShadeOpacity(mixin, 0.1),
});

/**
 * Generally the solid fill hover state should use
 * lighter version of the primary color, and the
 * solid fill active state should use a darker version
 * of the primary color.
 *
 * The reason that these mixins are just references
 * to their base mixins is that no other changes need
 * to be made except for the color. So they can just
 * be called with the new colors.
 */

const mixins = {
  // partial helper mixins
  makeFillerBase,
  makeFillerTransitions,
  prepareFocusRing,
  makeFocusRing,
  setFocusRingOpacity,
  prepareShade,
  makeShade,
  prepareAndMakeShade,
  setShadeOpacity,

  // complete fill mixins
  makeSolidFill,
  makeSolidFillHover: makeSolidFill,
  makeSolidFillActive: makeSolidFill,
  makeShadedFill,
  makeShadedFillHover,
  makeShadedFillActive: makeShadedFillHover,
  makeOutlinedFill,
  makeOutlinedFillHover,
  makeOutlinedFillActive,
  makeGhostFill,
  makeGhostFillHover,
  makeGhostFillActive,
};

module.exports = mixins;
