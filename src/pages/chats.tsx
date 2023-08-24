import React, { FC, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ChatWindow from '../components/PhoneView/ChatWindow';
import { logToAndroid, triggerEventInAndroid } from '../utils/android-events';
import { AppContext } from '../utils/app-context';

const Chats: FC = () => {
	const { id } = useParams<{ id: string }>();
	const context = useContext(AppContext);

	const history = useHistory();
	useEffect(() => {
		if (!id) history.push('/');
	}, [history, id]);

	useEffect(() => {
		triggerEventInAndroid('onBotListingScreenFocused',false);
		logToAndroid(`On Home Page onBotListingScreenFocused:false triggered`);
	}, []);

	return <ChatWindow currentUser={context?.currentUser} />;
};

export default Chats;