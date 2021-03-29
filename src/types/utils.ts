export type MergeProps<T extends object = {}, P extends object = {}> = Omit<T, keyof P> & P;

export type MergeElementProps<T extends React.ElementType, P extends object = {}> = Omit<
  React.ComponentPropsWithRef<T>,
  keyof P
> &
  P;

export type MergeElementPropsWithoutRef<T extends React.ElementType, P extends object = {}> = Omit<
  React.ComponentPropsWithoutRef<T>,
  keyof P
> &
  P;

// expands object types one level deep (https://stackoverflow.com/a/57683652/11386649)
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// expands object types recursively (https://stackoverflow.com/a/57683652/11386649)
export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;
