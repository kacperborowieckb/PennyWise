import { api } from '../api/apiSlice';

type AddBalanceMutationArgs = {
  uid: string;
  amount: number;
};

const balanceApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query<{ balance: number }, string>({
      query: (uid) => ({
        url: `/balance/${uid}`,
        method: 'GET',
      }),
      providesTags: ['Balance'],
    }),
    addBalance: builder.mutation<void, AddBalanceMutationArgs>({
      query: (args) => ({
        url: '/balance',
        method: 'PATCH',
        body: { ...args },
      }),
      invalidatesTags: ['Balance'],
    }),
  }),
});

export const { useGetBalanceQuery, useAddBalanceMutation } = balanceApiSlice;
