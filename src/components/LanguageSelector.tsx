
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm font-medium">{t('common.language')}:</span>
      <Button
        variant={i18n.language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => changeLanguage('en')}
      >
        English
      </Button>
      <Button
        variant={i18n.language === 'es' ? 'default' : 'outline'}
        size="sm"
        onClick={() => changeLanguage('es')}
      >
        Español
      </Button>
    </div>
  );
};

export default LanguageSelector;
