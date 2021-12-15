import { useMemo } from 'react';

export type UseTranslationsProps<T> = {
  fallbackTranslations: T;
  customTranslations?: Partial<T>;
};

/**
 * Accepts an object of fallback translations and custom
 * translations that override the fallback translations
 * and returns a merged object of translations.
 */
export function useTranslations<T extends Record<string, string>>({
  fallbackTranslations,
  customTranslations,
}: UseTranslationsProps<T>): T {
  return useMemo(
    () => ({ ...(fallbackTranslations || {}), ...(customTranslations || {}) }),
    [customTranslations, fallbackTranslations],
  );
}

/**
 * Accepts a string and its replacement args. The string must use
 * sequential placeholders in the format {0}, {1}, {2}, etc.
 *
 * @param {string} translation eg. "My favor color is {0}. My favorite number is {1}."
 * @param {...(string | number)} args The replacements for each placeholder
 * @returns {string} eg. My favorite color is yellow and my favorite number is 42.
 */
export function substituteTranslationArgs(translation: string, ...args: Array<string | number>): string {
  return args.reduce((substituted: string, arg, i): string => {
    return substituted.replace(new RegExp(`\\{${i}\\}`, 'g'), `${arg}`);
  }, translation);
}
