import { createContext } from 'react';

type AppContextType = any;

export const PhoneViewContext = createContext<AppContextType | null>(null);
