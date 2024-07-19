import { useConfig } from 'docz';

export function Version(): string | null {
  const config = useConfig();
  return config.version;
}
