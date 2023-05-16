"use client";
import React from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie';
import SSRProvider from './SSRProvider';
import { LocaleProvider } from './LocaleProvider';


export const Provider = ({ children }: { children: React.ReactNode }) => {
    return <>
        <CacheProvider>
            <ChakraProvider>
                <CookiesProvider>
                        <SSRProvider>
                            <LocaleProvider>
                            {children}
                            </LocaleProvider>
                        </SSRProvider>
                </CookiesProvider>
            </ChakraProvider>
        </CacheProvider>
    </>;
}

