import { api } from '../api/apiSlice';
import { setCredentials } from './authSlice';

type Credentials = {
  username: string;
  password: string;
};

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, Credentials>({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    login: builder.mutation<void, Credentials>({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation<Credentials & { _id: string }, void>({
      query: () => ({
        url: '/refresh',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ ...data }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshMutation } = authApiSlice;
