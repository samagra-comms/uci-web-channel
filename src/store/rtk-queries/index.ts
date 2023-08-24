// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed

const headers ={
      "Content-Type": "application/json",
      ownerID: process.env.REACT_APP_OWNER_ID,
      ownerOrgID: process.env.REACT_APP_OwnerOrgId,
      "admin-token": process.env.REACT_APP_Admin_Token,
    }
  
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' ,headers}),
  endpoints: () => ({}),
})