import { StructuredCssMap } from '@tailwind-studio/types';
import { getPrefixFromMedia } from './mediaToPrefix';

export function normalizeResponsiveMap(map: StructuredCssMap) {
  const result: Record<string, string[]> = {};

  for (const selector in map) {
    const styles = map[selector];

    // base
    if (styles.base) {
      result.base = result.base || [];
      result.base.push(...styles.base);
    }

    // media
    if (styles.media) {
      for (const mediaQuery in styles.media) {
        const prefix = getPrefixFromMedia(mediaQuery);
        if (!prefix) continue;

        result[prefix] = result[prefix] || [];
        result[prefix].push(...styles.media[mediaQuery]);
      }
    }
  }

  return result;
}
