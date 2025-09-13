import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    selectedCar: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearSelectedCar: (state) => {
      state.selectedCar = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedCar } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
