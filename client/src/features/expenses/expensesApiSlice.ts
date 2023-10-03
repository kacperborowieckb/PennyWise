import { Categories } from '../../helpers/categories';
import { api } from '../api/apiSlice';

export type Transaction = {
  uid: string;
  category: Categories;
  amount: number;
};

export type TExpensesQuery = {
  totalExpenses: number;
  expenses: Record<Categories, number>;
};

const expenseApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query<TExpensesQuery, string>({
      query: (uid) => ({
        url: `/expenses/${uid}`,
        method: 'GET',
      }),
      providesTags: ['Expenses'],
    }),
    addExpense: builder.mutation<void, Transaction>({
      query: (args) => ({
        url: '/expenses',
        method: 'POST',
        body: { ...args },
      }),
      invalidatesTags: ['Balance', 'Expenses'],
    }),
  }),
});

export const { useGetExpensesQuery, useAddExpenseMutation } = expenseApiSlice;
