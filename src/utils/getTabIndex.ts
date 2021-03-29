export const getTabIndex = (element: HTMLElement): number | undefined => {
  const tabIndex = element.getAttribute('tabindex');
  const attr = tabIndex ? parseInt(tabIndex, 10) : undefined;
  if (!Number.isNaN(attr)) return attr;
  if (element.contentEditable === 'true') return 0;
  return element.tabIndex;
};
