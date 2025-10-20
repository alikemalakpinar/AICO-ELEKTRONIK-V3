// i18n utilities
import { translations } from '../mock';

export const useTranslation = (lang) => {
  return translations[lang] || translations['tr'];
};

export const getLocalizedValue = (item, field, lang) => {
  const key = `${field}${lang === 'en' ? 'En' : 'Tr'}`;
  return item[key] || item[field] || '';
};
