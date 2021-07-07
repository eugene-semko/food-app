import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  categories: Array<{ id: number; name: string; products: Array<string> }>;
  status: string;
};
const initialState: initialStateType = {
  categories: [],
  status: "null",
};
export const getCategories = createAsyncThunk(
  "categoriesSlice/getCategories",
  async () => {
    return fetch(`https://evening-brook-32083.herokuapp.com/categories`).then(
      (res) => res.json()
    );
  }
);
export const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  extraReducers: {
    [getCategories.pending.toString()]: (state) => {
      state.status = "loading";
    },
    [getCategories.fulfilled.toString()]: (state, { payload }) => {
      state.categories = payload;
      state.status = "success";
    },
    [getCategories.rejected.toString()]: (state) => {
      state.status = "failed";
    },
  },
  reducers: {},
});
