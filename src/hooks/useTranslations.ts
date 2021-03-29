import { useMemo } from 'react';

export interface UseTranslationsInterface<T> {
  fallbackTranslations: T;
  customTranslations?: Partial<T>;
}

export function useTranslations<T extends Record<string, string>>({
  fallbackTranslations,
  customTranslations,
}: UseTranslationsInterface<T>) {
  return useMemo(() => ({ ...(fallbackTranslations || {}), ...(customTranslations || {}) }), [
    customTranslations,
    fallbackTranslations,
  ]);
}
