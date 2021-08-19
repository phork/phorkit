declare module '*.css' {
  const exports: Record<string, string>;
  export = exports;
}

declare module '*.png' {
  const exports: string;
  export default exports;
}

declare module '*.svg' {
  const exports: any;
  export default exports;
}

declare module "*.json";
