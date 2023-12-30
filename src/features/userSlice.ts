import { createSlice } from "@reduxjs/toolkit";
import { InitialUserState } from "../Types";

const initialUserState: InitialUserState = {
  user: null,
};

// ユーザーのlogin, logoutの状態を管理する
export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login: (state, action) => {
      // payloadはactionの中に入っている
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
