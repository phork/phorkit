export type ListItemElementType = 'li' | 'div' | 'span';

export type ListItemElementMap = {
  ul: 'li';
  div: Exclude<ListItemElementType, 'li'>;
  span: Exclude<ListItemElementType, 'li'>;
};

export type ListElementType = keyof ListItemElementMap;
