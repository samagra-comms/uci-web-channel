
"use client"
import { useCallback } from 'react';
import { useIntl } from 'react-intl';

export const useLocalization = () => {
    const intl = useIntl();
    const t = useCallback((label: string) => intl.formatMessage({ id: label }), [intl]);
    return { t }
}  