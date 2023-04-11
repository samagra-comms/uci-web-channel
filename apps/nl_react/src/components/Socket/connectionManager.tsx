import React, { FC } from 'react';
import { socket } from '../../socket';

export const ConnectionManager: FC<{ onConnect: () => void }> = ({ onConnect }) => {
	const connect = (): void => {
		socket.connect();
	};

	const disconnect = (): void => {
		socket.disconnect();
	};

	return <></>;
};