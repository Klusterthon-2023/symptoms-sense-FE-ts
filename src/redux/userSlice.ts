// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store'; // Assuming you have a store setup
import { stat } from 'fs';

interface UserState {
  id: string | null;
  firstname: string | null;
  lastname: string | null;
}

const initialState: UserState = {
  id: localStorage.getItem('id') ? localStorage.getItem('id') : null,
  firstname: localStorage.getItem('firstname') ? localStorage.getItem('firstname') : null,
  lastname: localStorage.getItem('lastname') ? localStorage.getItem('lastname') : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
    },
    clearUser: (state) => {
      state.id = null;
      state.firstname = null;
      state.lastname = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectId = (state: RootState) => state.user.id;
export default userSlice.reducer;
