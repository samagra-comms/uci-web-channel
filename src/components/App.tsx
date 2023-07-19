import React, { useEffect, useContext } from 'react';
import '../styles/globals.css';
import { filter } from 'lodash';
import { AppContext } from '../utils/app-context';
import RecentChats from './PhoneView/RecentChats';

interface appProps {
	currentUser: { name: string; number: string | null };
	allUsers: { name: string; number: string | null; active: boolean }[];
	toChangeCurrentUser: (arg: { name: string; number: string | null }) => void;
}

const App: React.FC<appProps> = () => {
	const { currentUser, allUsers, setMessages } = useContext(AppContext);

	useEffect(() => {
		try {
			// @ts-ignore
			const userMsgsFromLocal = JSON.parse(localStorage.getItem('userMsgs'));
		
			if (userMsgsFromLocal?.length > 0) {
				const userMsgs = filter(userMsgsFromLocal, {
					botUuid: currentUser?.id
				});

				// setMessages(retrievedMessages);
				setMessages(userMsgs);
			}
			window && window?.androidInteract?.log(localStorage.getItem('allMessages') || '');
		} catch (err) {
			window &&
				window?.androidInteract?.log(`error in fetching allMessages:${JSON.stringify(err)}`);
		}
	}, [setMessages, currentUser?.id]);

	return <RecentChats allUsers={allUsers} />;
};

export default App;
