import { createSlice } from "@reduxjs/toolkit";
import { InitialBookState } from "../Types";

const initialState: InitialBookState = {
  bookId: "General",
  bookName: "General",
};

// ユーザーのlogin, logoutの状態を管理する
export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBookInfo: (state, action) => {
      // dispatchで呼ぶことで更新する
      state.bookId = action.payload.bookId;
      state.bookName = action.payload.bookName;
    },
  },
});

export const { setBookInfo } = bookSlice.actions;
export default bookSlice.reducer;
