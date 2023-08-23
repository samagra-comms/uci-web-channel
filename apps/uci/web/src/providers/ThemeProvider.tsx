import React, { createContext, useContext, useEffect, useState } from 'react';
import { light_theme, dark_theme } from '@/config/theme';

interface ThemeContextType {
    theme: any;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Load theme preference from local storage or default to light mode
        const storedTheme = localStorage.getItem('theme');
        setIsDarkMode(storedTheme === 'dark');
    }, []);

    useEffect(() => {
        // Update local storage with the current theme preference
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        const root = document.documentElement;
        root.style.setProperty(
            '--chat-bg-color',
            isDarkMode ? dark_theme.background : light_theme.background,
        );
        root.style.setProperty(
            '--chat-box-shadow',
            isDarkMode ? dark_theme.boxShadow : light_theme.boxShadow,
        );
        root.style.setProperty(
            '--chat-footer-color',
            isDarkMode ? dark_theme.mainBackground : light_theme.mainBackground,
        );
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const theme = isDarkMode ? dark_theme : light_theme;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};
