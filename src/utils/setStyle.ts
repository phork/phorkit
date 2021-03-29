export const setStyleAttribute = (element: HTMLElement, attrs: Record<string, string>): void => {
  if (attrs !== undefined) {
    Object.keys(attrs).forEach((key: string) => {
      element.style.setProperty(key, attrs[key]);
    });
  }
};
