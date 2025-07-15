import { StructuredCssMap, TailwindStructuredMap } from '@tailwind-studio/types';
import { getPrefixFromMedia } from '../responsive/mediaToPrefix';

export function normalizeResponsiveMap(map: StructuredCssMap): TailwindStructuredMap {
  const result: TailwindStructuredMap = {};

  for (const selector in map) {
    const entry = map[selector];
    const normalized: TailwindStructuredMap[string] = {};

    if (entry.base) {
      normalized.base = entry.base;
    }

    const responsive: Record<string, string[]> = {};

    if (entry.media) {
      for (const media in entry.media) {
        const prefix = getPrefixFromMedia(media);
        if (prefix) {
          responsive[prefix] = entry.media[media];
        }
      }
    }

    if (Object.keys(responsive).length > 0) {
      normalized.responsive = responsive;
    }

    if (entry.pseudo) {
      normalized.pseudo = entry.pseudo;
    }

    result[selector] = normalized;
  }

  return result;
}
