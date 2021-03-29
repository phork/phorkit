/* eslint-disable no-restricted-properties */
// easings sourced from https://easings.net/

export type Easing = (x: number) => number;

export const easeInOutCubic: Easing = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
