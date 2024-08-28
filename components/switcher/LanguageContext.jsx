"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('all'); 
  useEffect(() => {
    // Эта проверка гарантирует, что код внутри useEffect будет выполняться только в браузере
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('country_brands');
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
