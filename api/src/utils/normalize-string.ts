import { remove } from 'diacritics';

export function normalizeString(name: string) {
  return remove(name).toLowerCase().trim();
}
