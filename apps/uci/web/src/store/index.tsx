import { configureStore } from '@reduxjs/toolkit';
import { userListSlice } from './slices/userListSlice';
import { userMessagesSlice } from './slices/userMessageSlice';
import logger from 'redux-logger';

const preloadedState = {
    userMessages: {
        messages: [],
        activeUserMessage: {},
        loading: false,
        error: null,
        starMessage: JSON.parse(localStorage.getItem('starredChats') || '{}'),
    },
};

export const store = configureStore({
    reducer: {
        userList: userListSlice.reducer,
        userMessages: userMessagesSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
    preloadedState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
