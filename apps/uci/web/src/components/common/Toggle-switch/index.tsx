import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';

const ToggleThemeButton = () => {
    const { toggleTheme } = useTheme();

    return <button onClick={toggleTheme}>Toggle Theme</button>;
};

export default ToggleThemeButton;
