import { api } from '../api/apiSlice';

type Credentials = {
  username: string;
  password: string;
};

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<unknown, Credentials>({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
