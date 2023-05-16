"use client"
import { useLocale } from '@/hooks';
import React from 'react'
import { IntlProvider } from 'react-intl';

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const { locale, messages } = useLocale();
  return (
    <IntlProvider locale={locale as string} messages={messages}>
        {children}
    </IntlProvider>
  )
}
