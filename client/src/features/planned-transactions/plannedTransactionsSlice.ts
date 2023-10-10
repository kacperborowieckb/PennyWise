import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from '../api/apiSlice';
import { Categories } from '../../helpers/categories';

export type PlannedTransaction = {
  plannedFor: string;
  amount: number;
  category: Categories;
  createdAt: Date;
  _id: string;
};

const plannedTransactionsAdapter = createEntityAdapter<PlannedTransaction>({
  selectId: (transaction) => transaction._id,
});

const initialState = plannedTransactionsAdapter.getInitialState({});

export const plannedTransactionsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPlannedTransactions: builder.query<EntityState<PlannedTransaction>, string>({
      query: (uid) => ({
        url: `/planned-transactions/${uid}`,
        method: 'GET',
      }),
      transformResponse: (responseData: PlannedTransaction[]) => {
        return plannedTransactionsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              ...result.ids.map((id) => ({ type: 'Planned-Transactions' as const, id })),
              { type: 'Planned-Transactions', id: 'LIST' },
            ]
          : [{ type: 'Planned-Transactions', id: 'LIST' }],
    }),
    addPlannedTransaction: builder.mutation<void, Partial<PlannedTransaction> & { uid: string }>({
      query: (args) => ({
        url: '/planned-transactions',
        method: 'POST',
        body: { ...args },
      }),
      invalidatesTags: [{ type: 'Planned-Transactions', id: 'LIST' }],
    }),
  }),
});

export const { useGetPlannedTransactionsQuery, useAddPlannedTransactionMutation } =
  plannedTransactionsApiSlice;
