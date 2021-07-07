import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  basket: Array<{ product: any; count: number }>;
  basketPrice: number;
  basketCount: number;
  address: {
    city: string;
    street: string;
  };
};
const initialState: initialStateType = {
  basket: [],
  basketPrice: 0,
  basketCount: 0,
  address: {
    city: "",
    street: "",
  },
};
export const basketSlice = createSlice({
  name: "basketSlice",
  initialState,
  reducers: {
    addFood: (state, { payload }: any) => {
      let indexOf;
      state.basketCount = 1;
      state.basketPrice = 0;
      state.basket.map((item, index: number) => {
        state.basketCount += item.count;
        state.basketPrice += Math.ceil(item.product.price) * item.count;
        if (item.product.id == payload.id) indexOf = index;
      });
      state.basketPrice += Math.ceil(payload.price);
      typeof indexOf == "number"
        ? (state.basket[indexOf].product = payload) &&
          state.basket[indexOf].count++
        : state.basket.push({
            product: payload,
            count: 1,
          });
    },
    removeFood: (state, { payload }: any) => {
      let indexOf;
      state.basket.map((item, index: number) => {
        if (item.product.id == payload.id) indexOf = index;
      });
      if (typeof indexOf == "number" && state.basket[indexOf].count > 0) {
        state.basketCount -= 1;
        state.basketPrice -= Math.ceil(payload.price);
        state.basketPrice = Math.ceil(state.basketPrice);
        state.basket[indexOf].count--;
      }
    },
    resetBasket: (state) => {
      state.basket = [];
      state.basketPrice = 0;
      state.basketCount = 0;
    },
    setAddress: (
      state,
      { payload }: PayloadAction<{ city: string; street: string }>
    ) => {
      state.address = payload;
    },
  },
});
