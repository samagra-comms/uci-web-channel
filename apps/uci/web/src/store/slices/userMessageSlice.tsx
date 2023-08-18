import { createSlice } from '@reduxjs/toolkit';

const userMessagesSlice = createSlice({
    name: 'userMessages',
    initialState: {
        messages: [],
        activeUserMessage: {},
        loading: false,
        error: null,
    },

    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setActiveUserMessage: (state, action) => {
            state.activeUserMessage = action.payload;
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
export const { setMessages, setActiveUserMessage, setLoading, setError } =
    userMessagesSlice.actions;
