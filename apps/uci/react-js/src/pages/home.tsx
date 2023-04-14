import { FC, useContext, useEffect } from 'react';
import App from '../components/App';
import { AppContext } from '../utils/app-context';

const Home: FC = () => {
	const { currentUser, allUsers, toChangeCurrentUser } = useContext(AppContext);

	useEffect(() => {
		window && window?.androidInteract?.onBotListingScreenFocused(true);
		window &&
			window?.androidInteract?.log(`On Home Page onBotListingScreenFocused:true triggered`);
	}, []);

	return (
		<App currentUser={currentUser} allUsers={allUsers} toChangeCurrentUser={toChangeCurrentUser} />
	);
};
export default Home;