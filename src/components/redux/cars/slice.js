import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById } from "./operations";

const initialState = {
  items: [],
  selectedCar: null,
  isLoading: false,
  error: null,
  page: 1,
  hasMore: true,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    clearSelectedCar: (state) => {
      state.selectedCar = null;
    },

    clearCars: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        const pageArg = action.meta.arg?.page ?? 1;

        if (pageArg === 1) {
          state.items = [];
          state.page = 1;
          state.hasMore = true;
        }
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        const { cars, page, limit } = action.payload;
        if (page === 1) {
          state.items = cars;
        } else {
          state.items = [...state.items, ...cars];
        }
        state.page = page;

        state.hasMore = Array.isArray(cars) ? cars.length === limit : false;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error?.message;
      });
  },
});

export const { clearSelectedCar, clearCars } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
