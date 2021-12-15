import { getTabIndex } from './getTabIndex';
import { isElementVisible } from './isElementVisible';

const isTabbable = (element: HTMLElement): boolean => {
  const tabIndex = getTabIndex(element);
  return !!(tabIndex || tabIndex === 0) && tabIndex !== -1;
};

export const isElementFocusable = (
  element?:
    | HTMLElement
    | HTMLAnchorElement
    | HTMLAudioElement
    | HTMLButtonElement
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | HTMLVideoElement,
): boolean => {
  if (!element) return false;

  const nodeName = element.nodeName.toLowerCase();
  let focusableIfVisible: boolean;

  if (/^(input|select|textarea|button|object)$/.test(nodeName)) {
    focusableIfVisible = 'disabled' in element ? !element.disabled : false;

    if (focusableIfVisible) {
      const fieldset = element.closest('fieldset');
      if (fieldset) {
        focusableIfVisible = !fieldset.disabled;
      }
    }
  } else if (nodeName === 'a') {
    focusableIfVisible = element.hasAttribute('href') || isTabbable(element);
  } else if (nodeName === 'audio' || nodeName === 'video') {
    focusableIfVisible = element.hasAttribute('controls');
  } else {
    focusableIfVisible = isTabbable(element);
  }

  // the currently selected element should be considered focusable
  return focusableIfVisible && (element == document.activeElement || isElementVisible(element));
};
