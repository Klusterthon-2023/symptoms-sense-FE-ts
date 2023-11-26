// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store'; // Assuming you have a store setup

interface UserState {
  id: string | null;
  username: string | null;
}

const initialState: UserState = {
  id: null,
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectId = (state: RootState) => state.user.id;
export default userSlice.reducer;
