import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import messageReducer from "./slices/messageSlice";
// import logger from "redux-logger";
// import { baseApi } from "./rtk-queries";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";


const reducer = {
    users: userReducer,
    messages: messageReducer,
    // [baseApi.reducerPath]: baseApi.reducer,
};

const preloadedState = {
    users: { active: JSON.parse(localStorage.getItem('currentUser')), all: [] ,status: 'idle',error: null ,loading:false},
};
export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
});

// setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
