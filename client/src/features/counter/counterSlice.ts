import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count++;
    },
  },
});

export const { increment } = counterSlice.actions;

export const getCount = (state: RootState) => state.counter.count;

export default counterSlice.reducer;
