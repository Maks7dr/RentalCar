import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ page = 1, limit = 12 }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { brand, price, mileageFrom, mileageTo } = state.filters;

      const { data } = await axios.get("/cars", {
        params: {
          page,
          limit,
          brand: brand || undefined,
          price: price || undefined,
          mileageFrom: mileageFrom || undefined,
          mileageTo: mileageTo || undefined,
          _ts: Date.now(), // ⏰ щоб обійти кеш
        },
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      return data.cars;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchById",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/cars/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
