import { api } from '../api/apiSlice';

type AddBalanceMutationArgs = {
  uid: string;
  amount: number;
};

const balanceApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addBalance: builder.mutation<void, AddBalanceMutationArgs>({
      query: (args) => ({
        url: '/balance',
        method: 'PATCH',
        body: { ...args },
      }),
    }),
  }),
});

export const { useAddBalanceMutation } = balanceApiSlice;
