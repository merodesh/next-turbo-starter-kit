
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium hidden sm:inline">{t('common.language')}:</span>
      
      {/* Desktop version with buttons */}
      <div className="hidden md:flex gap-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={i18n.language === lang.code ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleLanguageChange(lang.code)}
            className="min-w-0 px-2"
          >
            <span className="mr-1">{lang.flag}</span>
            <span className="hidden lg:inline">{lang.name}</span>
          </Button>
        ))}
      </div>

      {/* Mobile version with select */}
      <div className="md:hidden">
        <Select value={i18n.language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                <div className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LanguageSelector;
