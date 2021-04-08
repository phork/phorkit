import { useConfig } from 'docz';

export function Version() {
  const config = useConfig();
  return config.version;
}
