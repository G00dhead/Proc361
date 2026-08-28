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
    return 'en';
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
    const match = orderTextTranslations[text];
    if (match) {
      return match[language] || text;
    }
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
