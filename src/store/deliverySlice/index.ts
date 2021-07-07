import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  delivery: boolean;
};
const initialState: initialStateType = {
  delivery: false,
};
export const deliverySlice = createSlice({
  name: "deliverySlice",
  initialState,
  reducers: {
    setDeliveryFalse: (state) => {
      state.delivery = false;
    },
    setDeliveryTrue: (state) => {
      state.delivery = true;
    },
  },
});
