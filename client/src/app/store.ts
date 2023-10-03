import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { api } from '../features/api/apiSlice';
import authSlice from '../features/auth/authSlice';
import expensesSlice from '../features/expenses/expensesSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    expenses: expensesSlice,
    [api.reducerPath]: api.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === 'development'
      ? getDefaultMiddleware().concat(logger, api.middleware)
      : getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
