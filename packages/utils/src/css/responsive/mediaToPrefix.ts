export const mediaToPrefixMap: Record<string, string> = {
  'min-width:640px': 'sm',
  'min-width:768px': 'md',
  'min-width:1024px': 'lg',
  'min-width:1280px': 'xl',
  'min-width:1536px': '2xl'
};

export function getPrefixFromMedia(mediaQuery: string): string | undefined {
  const normalized = mediaQuery
    .toLowerCase()
    .replace(/\s+/g, '') // remove all spaces
    .trim();

  return mediaToPrefixMap[normalized];
}
