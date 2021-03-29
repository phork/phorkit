export type PermissiveCaseInput = string | number | PermissiveCaseInput[];

export function ucfirst(input: string): string {
  return input && input.charAt(0).toUpperCase() + input.slice(1);
}

export function lcfirst(input: string): string {
  return input && input.charAt(0).toLowerCase() + input.slice(1);
}

export function titleize(input: string): string {
  return input.split(' ').map(ucfirst).join(' ');
}

export function camelize(...props: PermissiveCaseInput[]): string {
  return props.reduce((acc: string, prop) => {
    let result = acc;
    if (prop || prop === 0) {
      if (Array.isArray(prop)) {
        result += prop.map(p => camelize(p)).join('');
      } else if (typeof prop === 'object') {
        result += camelize(Object.values(prop));
      } else if (typeof prop === 'number') {
        if (!Number.isNaN(prop)) {
          result += prop;
        }
      } else if (typeof prop === 'string' && prop.includes('-')) {
        result += camelize(prop.split('-'));
      } else if (typeof prop === 'string') {
        result += ucfirst(prop);
      }
    }
    return result;
  }, '');
}

export function lowerCamelize(...props: PermissiveCaseInput[]): string {
  const camelized = camelize(props);
  return camelized && lcfirst(camelized);
}

export function kebabify(...props: PermissiveCaseInput[]): string {
  return props.reduce((acc: string, prop) => {
    let result = acc ? `${acc}-` : '';
    if (prop || prop === 0) {
      if (Array.isArray(prop)) {
        result += prop.map(p => kebabify(p)).join('-');
      } else if (typeof prop === 'object') {
        result += kebabify(Object.values(prop));
      } else if (typeof prop === 'number') {
        if (!Number.isNaN(prop)) {
          result += prop;
        }
      } else if (prop !== prop.toLowerCase()) {
        result += prop.replace(/([^A-Z0-9])([A-Z0-9])/g, '$1-$2').toLowerCase();
      } else {
        result += prop.toLowerCase();
      }
    }
    return result;
  }, '');
}
