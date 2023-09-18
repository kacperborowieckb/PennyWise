import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import counterSlice from '../features/counter/counterSlice';
import { api } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
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
