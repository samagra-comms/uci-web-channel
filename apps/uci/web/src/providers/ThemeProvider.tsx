import React, { createContext, useContext, useEffect, useState } from 'react';
import { light_theme, dark_theme } from '@/config/theme';
import { config } from '@/config';

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
            '--chat-footer-color',
            isDarkMode ? dark_theme.mainBackground : light_theme.mainBackground,
        );
        root.style.setProperty(
            '--text-input-border-radius',
            config?.textInput?.borderRadius,
        );
        root.style.setProperty(
            '--text-input-margin',
            config?.textInput?.margin,
        );
        root.style.setProperty(
            '--text-input-padding',
            config?.textInput?.padding,
        );
        root.style.setProperty(
            '--text-input-send-icon-color',
            isDarkMode ? 'black' : light_theme.color,
        );
        root.style.setProperty('--input-color', theme?.color);
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
