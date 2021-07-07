import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  containers: number[];
  windowScrollHeight: number;
};
const initialState: initialStateType = {
  containers: [],
  windowScrollHeight: 0,
};
export const scrollSlice = createSlice({
  name: "scrollSlice",
  initialState,
  reducers: {
    setContainerHeight: (
      state,
      { payload }: PayloadAction<{ id: number; height: number }>
    ) => {
      if (payload.id == 0) {
        state.containers[payload.id] = payload.height;
      } else {
        state.containers[payload.id] =
          payload.height + state.containers[payload.id - 1];
      }
    },
    setWindowScrollHeight: (state, { payload }: PayloadAction<number>) => {
      state.windowScrollHeight = payload;
    },
  },
});
