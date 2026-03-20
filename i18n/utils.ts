import { routing } from './routing';

export type Locale = (typeof routing.locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return (routing.locales as readonly string[]).includes(locale);
}
