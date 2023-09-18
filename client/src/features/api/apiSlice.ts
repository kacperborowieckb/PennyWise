import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.chucknorris.io/' }),
  tagTypes: ['Joke'],
  endpoints: (builder) => ({
    getRandomJoke: builder.query<string, void>({
      query: () => 'jokes/random',
      transformResponse: (result: { value: string }) => {
        return result.value;
      },
    }),
  }),
});

export const { useGetRandomJokeQuery } = api;
