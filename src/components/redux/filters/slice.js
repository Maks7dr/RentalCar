import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: "",
  price: "",
  mileageFrom: "",
  mileageTo: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload ? Number(action.payload) : "";
    },
    setMileageFrom: (state, action) => {
      state.mileageFrom = action.payload ? Number(action.payload) : "";
    },
    setMileageTo: (state, action) => {
      state.mileageTo = action.payload ? Number(action.payload) : "";
    },

    // <-- новий редьюсер, який ти використовував у Filters.jsx
    setFilters: (state, action) => {
      const { brand, price, mileageFrom, mileageTo } = action.payload || {};
      state.brand = brand ?? "";
      state.price = price ? Number(price) : "";
      state.mileageFrom = mileageFrom ? Number(mileageFrom) : "";
      state.mileageTo = mileageTo ? Number(mileageTo) : "";
    },

    resetFilters: () => initialState,
  },
});

export const {
  setBrand,
  setPrice,
  setMileageFrom,
  setMileageTo,
  setFilters,
  resetFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
