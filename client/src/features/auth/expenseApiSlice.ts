import { Categories } from '../../helpers/categories';
import { api } from '../api/apiSlice';

export type Transaction = {
  uid: string;
  category: Categories;
  amount: number;
};

const expenseApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addExpense: builder.mutation<void, Transaction>({
      query: (args) => ({
        url: '/expense',
        method: 'POST',
        body: { ...args },
      }),
      invalidatesTags: ['Balance'],
    }),
  }),
});

export const { useAddExpenseMutation } = expenseApiSlice;
