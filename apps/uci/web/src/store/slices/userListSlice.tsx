import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//! USER LIST-> All,active/current ,loading,error ,setUser,setUsers
//! USER MESSAGES (MESSAGE SLICE)

export const fetchUsers = createAsyncThunk('userlist/fetchUsers', async () => {
    const response = await axios.get(
        process.env.NEXT_PUBLIC_UCI_BASE_URL ?? '',
    );
    const data = await response.data;
    return data;
});

const userListSlice = createSlice({
    name: 'userlist',
    initialState: {
        users: [],
        currentUser: {},
        loading: false,
        error: '',
        expiredBot: false,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            if (action.error) {
                state.error = action.error.message || 'Unknown Error Occured';
            } else {
                state.error = 'Unknown Error Occured';
            }
        });
    },
});

export { userListSlice };
export const { setUsers, setCurrentUser, setLoading, setError } =
    userListSlice.actions;
