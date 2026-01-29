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

/**
 * Title-case text using Turkish locale rules.
 * Capitalizes the first letter of each word.
 */
export function toTurkishTitle(text: string): string {
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/(^|\s)\S/g, (match) => match.toLocaleUpperCase('tr-TR'));
}

/**
 * Known Turkish label corrections for common ASCII mistakes.
 * Only applies to known UI labels / zone names.
 */
const TURKISH_CORRECTIONS: Record<string, string> = {
  'Odasi': 'Odası',
  'Oturma Odasi': 'Oturma Odası',
  'Yatak Odasi': 'Yatak Odası',
  'Hizmet Odasi': 'Hizmet Odası',
  'Calisma Odasi': 'Çalışma Odası',
  'Cocuk Odasi': 'Çocuk Odası',
  'Banyo': 'Banyo',
  'Giris': 'Giriş',
  'Cikis': 'Çıkış',
  'Guvenlik': 'Güvenlik',
  'Aydinlatma': 'Aydınlatma',
  'Isiklar': 'Işıklar',
  'Sicaklik': 'Sıcaklık',
  'Iklim': 'İklim',
  'Eglence': 'Eğlence',
  'Disarida': 'Dışarıda',
  'Hizli Sahneler': 'Hızlı Sahneler',
  'Acik': 'Açık',
  'Kapali': 'Kapalı',
  'Tuketim': 'Tüketim',
  'Tasarruf': 'Tasarruf',
  'Cozumler': 'Çözümler',
  'Iletisim': 'İletişim',
  'Hakkimizda': 'Hakkımızda',
  'Kariyer': 'Kariyer',
  'Gizlilik Politikasi': 'Gizlilik Politikası',
  'Kullanim Sartlari': 'Kullanım Şartları',
  'Akilli Villa': 'Akıllı Villa',
  'Akilli Rezidans': 'Akıllı Rezidans',
  'Akilli Apartman': 'Akıllı Apartman',
  'Muhendislik': 'Mühendislik',
  'Ozellikler': 'Özellikler',
  'Baglanti': 'Bağlantı',
  'Surdurulebilirlik': 'Sürdürülebilirlik',
  'Kestirimci Bakim': 'Kestirimci Bakım',
  'Erisim Kontrolu': 'Erişim Kontrolü',
  'Enerji Analitigi': 'Enerji Analitiği',
  'Akilli Bildirimler': 'Akıllı Bildirimler',
  'Guvenlik Izleme': 'Güvenlik İzleme',
};

/**
 * Normalize known Turkish label mistakes.
 * Only corrects known labels - does not globally mutate unknown content.
 */
export function normalizeTR(text: string): string {
  return TURKISH_CORRECTIONS[text] ?? text;
}

// Dev-only verification:
// "i".toLocaleUpperCase('tr-TR') === "İ" ✓
// "I".toLocaleLowerCase('tr-TR') === "ı" ✓
// "ş".toLocaleUpperCase('tr-TR') === "Ş" ✓
