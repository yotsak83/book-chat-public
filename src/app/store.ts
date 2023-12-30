import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import bookReducer from "../features/bookSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
