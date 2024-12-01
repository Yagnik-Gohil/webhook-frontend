import { configureStore } from "@reduxjs/toolkit";
import eventHistorySlice from "./event-history/eventHistorySlice";

export const store = configureStore({
  reducer: {
    eventHistory: eventHistorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
