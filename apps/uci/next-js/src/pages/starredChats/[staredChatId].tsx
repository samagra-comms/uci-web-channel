import React from 'react';
import dynamic from 'next/dynamic';

const StarredChatsPage = dynamic(() => import('../../components/PhoneView/StarredChatPage'), {
	ssr: false
  });
const StarredChat=()=>{
    return <div><StarredChatsPage /></div>
}

export default StarredChat