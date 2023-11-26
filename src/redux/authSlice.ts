// authSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store'; // Assuming you have a store setup

// Define the shape of the state
interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isVerifying: boolean;
}

// Define the initial state
const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  isVerifying: false,
};

// Define an async thunk for verifying the access token

// Create a slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer function to handle login
    login: (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    // Reducer function to handle logout
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },

});

// Export actions
export const { login, logout } = authSlice.actions;

// Selectors
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsVerifying = (state: RootState) => state.auth.isVerifying;

// Export the reducer
export default authSlice.reducer;
