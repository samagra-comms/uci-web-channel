export const setLocalStorage = (): void => {
	localStorage.setItem(
		'auth',`${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
	);
	localStorage.setItem('mobile', `${process.env.NEXT_PUBLIC_USER_MOBILE}`);
	localStorage.setItem(
		'botList',
		`${process.env.NEXT_PUBLIC_BOT_LIST}`
	);
};
