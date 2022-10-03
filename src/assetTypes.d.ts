declare module '*.css' {
  const exports: Record<string, string>;
  export = exports;
}

declare module '*.png' {
  const exports: string;
  export default exports;
}

declare module '*.jpg' {
  const exports: string;
  export default exports;
}

declare module '*.svg' {
  const exports: unknown;
  export default exports;
}

declare module "*.json";
