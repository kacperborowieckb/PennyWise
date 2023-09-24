import { api } from '../api/apiSlice';
import { AuthSliceInitialState, logOut, setCredentials } from './authSlice';

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
    login: builder.mutation<AuthSliceInitialState, Credentials>({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          dispatch(api.util.resetApiState);
        } catch (err) {
          console.error(err);
        }
      },
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
          console.error(err);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useRefreshMutation } =
  authApiSlice;
