import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type expensesInitialState = {
  totalExpenses: number | null;
};

const initialState: expensesInitialState = {
  totalExpenses: null,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setTotalExpenses: (state, action) => {
      state.totalExpenses = action.payload;
    },
  },
});

export const { setTotalExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;

export const selectTotalExpenses = (state: RootState) => state.expenses.totalExpenses;
