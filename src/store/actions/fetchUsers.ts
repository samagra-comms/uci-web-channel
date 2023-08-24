
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { getBotDetailsUrl } from '../../utils/urls';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (data,thunk) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                ownerID: process.env.REACT_APP_OWNER_ID,
                ownerOrgID: process.env.REACT_APP_OwnerOrgId,
                "admin-token": process.env.REACT_APP_Admin_Token,
            },
        };
        const url = getBotDetailsUrl();


        const response = await axios.get(url, config);
        console.log("shri ram:", { response })
        return response?.data?.result;
    }
    catch (err) {
        let error: AxiosError<any> = err // cast the error for access
        if (!error.response) {
            throw err
        }
        // We got validation errors, let's return those so we can reference in our component and set form errors
        return thunk.rejectWithValue(error.response.data)
    }
});

