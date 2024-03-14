import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { User } from "../../types";
import { getConvHistoryUrl } from "../../utils/urls";

export const fetchHistory = createAsyncThunk<User, any>(
  "messages/fetchHistory",
  async (data, thunk) => {
    try {
      const url = getConvHistoryUrl(data);
      console.log({url})
      const response = await axios.get(url);
      return response?.data?.result?.records;
    } catch (err) {
      let error: AxiosError<any> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunk.rejectWithValue(error.response.data);
    }
  }
);
