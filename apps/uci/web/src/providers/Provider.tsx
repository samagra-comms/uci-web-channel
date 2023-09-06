'use client';
import React from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, Toast } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import SSRProvider from './SSRProvider';
import { ThemeProvider } from './ThemeProvider';
import { store } from '../store/index';
import { Provider as Pro } from 'react-redux';
import { ToastProvider } from './ToastProvider';

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Pro store={store}>
                <ThemeProvider>
                    <CacheProvider>
                        <ChakraProvider>
                            <CookiesProvider>
                                <ToastProvider>
                                    <SSRProvider>{children}</SSRProvider>
                                </ToastProvider>
                            </CookiesProvider>
                        </ChakraProvider>
                    </CacheProvider>
                </ThemeProvider>
            </Pro>
        </>
    );
};
