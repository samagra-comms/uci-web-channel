import React, { FC } from 'react';
import { ContextProvider } from './ContextProvider';

const SSRProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    //    if (typeof window === 'undefined')
    //    return null
    return <ContextProvider>{children}</ContextProvider>;
};

export default SSRProvider;
