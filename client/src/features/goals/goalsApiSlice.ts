import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from '../api/apiSlice';

type Goals = {
  name: string;
  amount: number;
  goal: number;
};

const goalsAdapter = createEntityAdapter<Goals>({
  selectId: (goal) => goal.name,
});

const initialState = goalsAdapter.getInitialState({});

export const goalsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getGoals: builder.query<EntityState<Goals>, string>({
      query: (uid) => ({
        url: `/goals/${uid}`,
        method: 'GET',
      }),
      transformResponse: (responseData: Goals[]) => {
        return goalsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              ...result.ids.map((id) => ({ type: 'Goals' as const, id })),
              { type: 'Goals', id: 'LIST' },
            ]
          : [{ type: 'Goals', id: 'LIST' }],
    }),
    addNewGoal: builder.mutation<void, Partial<Goals> & { uid: string }>({
      query: (args) => ({
        url: '/goals',
        method: 'POST',
        body: { ...args },
      }),
      invalidatesTags: [{ type: 'Goals', id: 'LIST' }],
    }),
    transferToGoal: builder.mutation<void, Partial<Goals> & { uid: string }>({
      query: (args) => ({
        url: '/goals',
        method: 'PATCH',
        body: { ...args },
      }),
      invalidatesTags: [{ type: 'Goals', id: 'LIST' }],
    }),
    deleteGoal: builder.mutation<void, Partial<Goals> & { uid: string }>({
      query: (args) => ({
        url: '/goals',
        method: 'DELETE',
        body: { ...args },
      }),
      invalidatesTags: [{ type: 'Goals', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetGoalsQuery,
  useTransferToGoalMutation,
  useAddNewGoalMutation,
  useDeleteGoalMutation,
} = goalsApiSlice;
