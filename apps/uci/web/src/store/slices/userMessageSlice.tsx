import { createSlice } from '@reduxjs/toolkit';

const userMessagesSlice = createSlice({
    name: 'userMessages',
    initialState: {
        messages: [],
        activeUserMessage: {},
        loading: false,
        error: null,
        starMessage: [],
    },

    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setActiveUserMessage: (state, action) => {
            state.activeUserMessage = action.payload;
        },
        setStarMessage: (state, action) => {
            state.starMessage = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export { userMessagesSlice };
export const {
    setMessages,
    setActiveUserMessage,
    setLoading,
    setError,
    setStarMessage,
} = userMessagesSlice.actions;

export const starredMessageSelector = (state: any) =>
    state?.userMessages?.starMessage;
