
'use client';

import React from 'react'
import BotList from './bot-list/page';
import ChatAI from './chat-ai/page';

const Home = () => {
  let homePage="AI";

  if(homePage==="NL")
  return <BotList />
  if(homePage==="AI")
  return <ChatAI />
}

export default Home