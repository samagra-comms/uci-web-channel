import { getBotDetailsUrl } from '../../utils/urls'
import { baseApi } from './index'

const allContextApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchUsers: build.query({
      query: () => getBotDetailsUrl(),
    }),
  }),
  overrideExisting: false,
})

export const { useFetchUsersQuery,useLazyFetchUsersQuery,usePrefetch } = allContextApi