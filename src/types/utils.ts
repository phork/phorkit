/* eslint-disable @typescript-eslint/no-explicit-any */
export type MergeProps<T extends object, P extends object> = Omit<T, keyof P> & P;

// see https://github.com/microsoft/TypeScript/issues/36860 for css, sx removal notes
export type MergeElementProps<T extends React.ElementType, P extends object> = Omit<
  React.ComponentPropsWithRef<T>,
  keyof P | 'css' | 'sx'
> &
  P;

// see https://github.com/microsoft/TypeScript/issues/36860 for css, sx removal notes
export type MergeElementPropsWithoutRef<T extends React.ElementType, P extends object> = Omit<
  React.ComponentPropsWithoutRef<T>,
  keyof P | 'css' | 'sx'
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

// type can be div, span, etc.
export type AsType<T extends keyof JSX.IntrinsicElements> = {
  as?: T;
};

// type can be div, span, etc. or a react element
export type AsReactType<T extends React.ElementType> = {
  as?: T | ((props: any) => React.ReactElement<any, T>);
};

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
