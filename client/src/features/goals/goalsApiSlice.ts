import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from '../api/apiSlice';

export type Goals = {
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
    transferToGoal: builder.mutation<
      { message: string; isFinished: boolean },
      Partial<Goals> & { uid: string }
    >({
      query: (args) => ({
        url: '/goals',
        method: 'PATCH',
        body: { ...args },
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Goals', id: arg.name }, 'Balance'],
    }),
    deleteGoal: builder.mutation<void, Partial<Goals> & { uid: string }>({
      query: (args) => ({
        url: '/goals',
        method: 'DELETE',
        body: { ...args },
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Goals', id: arg.name }, 'Balance'],
    }),
    withDrawFromGoal: builder.mutation<void, Partial<Goals> & { uid: string }>({
      query: (args) => ({
        url: '/goals/withdraw',
        method: 'PATCH',
        body: { ...args },
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Goals', id: arg.name }, 'Balance'],
    }),
  }),
});

export const {
  useGetGoalsQuery,
  useTransferToGoalMutation,
  useAddNewGoalMutation,
  useDeleteGoalMutation,
  useWithDrawFromGoalMutation,
} = goalsApiSlice;
