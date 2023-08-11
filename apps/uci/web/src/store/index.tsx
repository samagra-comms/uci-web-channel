import {configureStore} from '@reduxjs/toolkit';
import { userListSlice } from './slices/userListSlice';
import { userMessagesSlice } from './slices/userMessageSlice';
import logger from 'redux-logger';

export const store = configureStore({
    reducer: {
        userList: userListSlice.reducer,
        userMessages: userMessagesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;