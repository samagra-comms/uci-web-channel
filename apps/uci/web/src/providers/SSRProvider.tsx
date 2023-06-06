import React, { FC } from 'react'
import { ContextProvider } from './ContextProvider';

const SSRProvider: FC<{ children:  React.ReactNode }> = ({ children }) => {
    return <ContextProvider>{children}</ContextProvider>
}

export default SSRProvider;