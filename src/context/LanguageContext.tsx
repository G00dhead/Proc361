import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Language, translations, orderTextTranslations, TranslationDictionary } from '../i18n/translations';

export type TFunction = {
  (key: keyof TranslationDictionary): string;
} & TranslationDictionary;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TFunction;
  translateOrderText: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('proc360_language');
      if (saved === 'zh' || saved === 'en') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'zh';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('proc360_language', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'zh' : 'en';
    setLanguage(nextLang);
  };

  const t: TFunction = useMemo(() => {
    const langDict = translations[language] || translations.en;
    
    const fn = (key: keyof TranslationDictionary): string => {
      if (langDict && langDict[key]) {
        return langDict[key];
      }
      return translations.en[key] || String(key);
    };

    return new Proxy(fn as any, {
      get(target, prop: string) {
        if (typeof prop === 'string') {
          if (langDict && (prop in langDict)) {
            return (langDict as any)[prop];
          }
          if (prop in translations.en) {
            return (translations.en as any)[prop];
          }
        }
        return (target as any)[prop];
      },
      apply(target, _thisArg, args) {
        const key = args[0] as keyof TranslationDictionary;
        return target(key);
      },
    }) as TFunction;
  }, [language]);

  const translateOrderText = (text: string): string => {
    if (!text) return '';
    if (language === 'en') return text;
    
    const trimmed = text.trim();
    const match = orderTextTranslations[trimmed] || orderTextTranslations[text];
    if (match) {
      return match[language] || text;
    }

    // Dynamic date translations for ETA strings
    if (trimmed.includes('Today by 6:00 PM')) return '今日 18:00 前';
    if (trimmed.includes('Today by 5:00 PM')) return '今日 17:00 前';
    if (trimmed.includes('Delivered Aug 24')) return '已送达 (8月24日)';
    if (trimmed.includes('Delivered Aug 23')) return '已送达 (8月23日)';
    if (trimmed.includes('Aug 27, 2026') || trimmed === '27 Aug') return '8月27日';
    if (trimmed.includes('Aug 28, 2026') || trimmed === '28 Aug') return '8月28日';
    if (trimmed.includes('Aug 29, 2026') || trimmed === '29 Aug' || trimmed.includes('29 Aug 2026')) return '8月29日';
    if (trimmed.includes('Aug 30, 2026') || trimmed === '30 Aug' || trimmed.includes('30 Aug 2026')) return '8月30日';
    if (trimmed.includes('Sep 05, 2026') || trimmed === '05 Sep' || trimmed.includes('05 Sep 2026')) return '9月5日';
    if (trimmed.includes('Sep 12, 2026') || trimmed === '12 Sep' || trimmed.includes('12 Sep 2026')) return '9月12日';
    if (trimmed.includes('24 Sep, 2026')) return '9月24日';

    return text;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        translateOrderText,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
