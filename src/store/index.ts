import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categoriesSlice } from "./categoriesSlice";
import { deliverySlice } from "./deliverySlice";
import { basketSlice } from "./basketSlice";
import { scrollSlice } from "./scrollSlice";

const reducers = combineReducers({
  categoriesSlice: categoriesSlice.reducer,
  deliverySlice: deliverySlice.reducer,
  basketSlice: basketSlice.reducer,
  scrollSlice: scrollSlice.reducer,
});

export const store = configureStore({ reducer: reducers });
export type StateType = ReturnType<typeof reducers>;
