import { FC, useContext, useEffect } from 'react';
import ChatList from '../components/ChatList';
import { logToAndroid, triggerEventInAndroid } from '../utils/android-events';
import { AppContext } from '../utils/app-context';

const Home: FC = () => {
	const { currentUser, allUsers, toChangeCurrentUser } = useContext(AppContext);

	useEffect(() => {
		triggerEventInAndroid('onBotListingScreenFocused',true);
		logToAndroid (`On Home Page onBotListingScreenFocused:true triggered`);
	}, []);

	return (
		<ChatList currentUser={currentUser} allUsers={allUsers} toChangeCurrentUser={toChangeCurrentUser} />
	);
};
export default Home;