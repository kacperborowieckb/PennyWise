import { api } from '../api/apiSlice';

type AddBalanceMutationArgs = {
  uid: string;
  amount: number;
};

const walletApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addBalance: builder.mutation<void, AddBalanceMutationArgs>({
      query: (args) => ({
        url: '/wallet',
        method: 'PATCH',
        body: { ...args },
      }),
    }),
  }),
});

export const { useAddBalanceMutation } = walletApiSlice;
