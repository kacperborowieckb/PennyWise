import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from '../api/apiSlice';
import { Categories } from '../../helpers/categories';

type PlannedTransaction = {
  plannedFor: string;
  amount: number;
  category: Categories;
  createdAt: Date;
};

const plannedTransactionsAdapter = createEntityAdapter<PlannedTransaction>({});

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
  }),
});

export const { useGetPlannedTransactionsQuery } = plannedTransactionsApiSlice;
