// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isKeyof<T extends Record<string, unknown>>(obj: T, possibleKey: keyof any): possibleKey is keyof T {
  return possibleKey in obj;
}
