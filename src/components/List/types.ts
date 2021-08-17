export type ListItemElementType = Extract<keyof JSX.IntrinsicElements, 'li' | 'div'>;

export type ListItemElementMap = {
  ul: Extract<ListItemElementType, 'li'>;
  div: Extract<ListItemElementType, 'div'>;
};

export type ListElementType = keyof ListItemElementMap;
