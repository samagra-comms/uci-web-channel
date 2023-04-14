import React, { FC, useContext, useEffect } from 'react';
// import { useHistory, useParams } from 'react-router-dom';

import { AppContext } from '../../context';
import ChatWindow from '../../components/PhoneView/ChatWindow';
import { useRouter } from 'next/router';


const Chats: FC = () => {
    const router = useRouter();
    console.log("abcd:",{router})
	// const { id } = useParams<{ id: string }>();
	const context = useContext(AppContext);
const id='xx';
	// const history = useHistory();
	useEffect(() => {
		if (!id) router.push('/');
	}, [history, id]);

	useEffect(() => {
		window && window?.androidInteract?.onBotListingScreenFocused(false);
		window &&
			window?.androidInteract?.log(`On Home Page onBotListingScreenFocused:false triggered`);
	}, []);

	return <ChatWindow currentUser={context?.currentUser} />;
};

export default Chats;