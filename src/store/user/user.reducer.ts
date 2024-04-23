import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../utils/firebase";

export type UserState = {
  readonly currentUser: UserData | null
  readonly isDropdownOpen: boolean
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  isDropdownOpen: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setIsDropdownOpen(state, action) {
      state.isDropdownOpen = action.payload;
    }
  }
});

export const { setCurrentUser, setIsDropdownOpen } = userSlice.actions;

export const userReducer = userSlice.reducer;