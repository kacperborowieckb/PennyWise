import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type AuthSliceInitialState = {
  username: string;
  accessToken: string;
  _id: string;
};

const initialState: AuthSliceInitialState = {
  username: '',
  accessToken: '',
  _id: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username, accessToken, _id } = action.payload;
      state.username = username;
      state.accessToken = accessToken;
      state._id = _id;
    },
    logOut: (state) => {
      state.username = '';
      state.accessToken = '';
      state._id = '';
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;
export const selectCurrentUserName = (state: RootState) => state.auth.username;
export const selectCurrentUserId = (state: RootState) => state.auth._id;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
