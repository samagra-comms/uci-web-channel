import React from 'react'
import { ChatAiContextProvider } from './ChatAiContextProvider'
import { NLContextProvider } from './NLContextProvider'

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  let contextRender = "NL"
  if (contextRender === "AI") {
    return (<ChatAiContextProvider>
      {children}
    </ChatAiContextProvider>)
  }
  if (contextRender === "NL") {
    return (<NLContextProvider>
      {children}
    </NLContextProvider>)
  }
  return <></>
}

