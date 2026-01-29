// ===========================================
// Turkish Locale Utilities
// Handles ı/İ and i/I casing correctly
// ===========================================

/**
 * Uppercase text using Turkish locale rules.
 * Handles: i → İ, ı → I (not i → I as in English)
 */
export function toTurkishUpper(text: string): string {
  return text.toLocaleUpperCase('tr-TR');
}

/**
 * Lowercase text using Turkish locale rules.
 * Handles: İ → i, I → ı (not I → i as in English)
 */
export function toTurkishLower(text: string): string {
  return text.toLocaleLowerCase('tr-TR');
}
