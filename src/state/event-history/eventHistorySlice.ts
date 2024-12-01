import { IEvent } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventHistoryState {
  events: IEvent[];
}

const initialState: EventHistoryState = {
  events: [],
};

const eventHistorySlice = createSlice({
  name: "eventHistory",
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<IEvent>) {
      state.events = [action.payload, ...state.events];
    },
  },
});

export const { addEvent } = eventHistorySlice.actions;

export default eventHistorySlice.reducer;
