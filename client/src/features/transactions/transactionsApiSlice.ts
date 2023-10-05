import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from '../api/apiSlice';
import { Categories } from '../../helpers/categories';

export type Transaction = {
  createdAt: Date;
  amount: number;
  category: Categories;
  _id: string;
};

const transactionsAdapter = createEntityAdapter<Transaction>({
  selectId: (transaction) => transaction._id,
  sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

const initialState = transactionsAdapter.getInitialState();

export const transactionsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<EntityState<Transaction>, string>({
      query: (uid) => ({
        url: `/transactions/${uid}`,
        method: 'GET',
      }),
      transformResponse: (responseData: Transaction[]) => {
        return transactionsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              ...result.ids.map((id) => ({ type: 'Transactions' as const, id })),
              { type: 'Transactions', id: 'LIST' },
            ]
          : [{ type: 'Transactions', id: 'LIST' }],
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionsApiSlice;
