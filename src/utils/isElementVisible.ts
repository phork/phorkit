export const isElementVisible = (element?: HTMLElement): boolean => {
  if (!element || typeof window === 'undefined' || typeof document === 'undefined') return false;

  const hasSize = element.offsetWidth || element.offsetHeight || element.getClientRects().length;
  if (!hasSize) return false;

  const style = window.getComputedStyle(element);
  const isInvisible =
    style.getPropertyValue('visibility') !== 'visible' || style.getPropertyValue('display') === 'none';
  if (isInvisible) return false;

  return true;
};

export const isElementInViewport = (element?: HTMLElement): boolean => {
  if (!element || typeof window === 'undefined' || typeof document === 'undefined') return false;

  const bounding = element.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const isElementVisibleAndInViewport = (element?: HTMLElement): boolean => {
  return isElementVisible(element) && isElementInViewport(element);
};
