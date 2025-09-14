import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (
    { page = 1, limit = 12, brand, price, mileageFrom, mileageTo } = {},
    thunkAPI
  ) => {
    try {
      const params = { page, limit };
      if (brand) params.brand = brand;

      console.log("🔎 fetchCars params:", {
        page,
        limit,
        brand,
        price,
        mileageFrom,
        mileageTo,
      });

      const response = await axios.get("/cars", {
        params,
        headers: { "Cache-Control": "no-cache" },
      });

      const payload = response.data;
      // API може повертати або масив, або { cars: [...] }
      let items = Array.isArray(payload) ? payload : payload.cars || [];

      console.log("🔎 received items:", items.length);

      // фронтова фільтрація (робимо максимально стійко до назви полів)
      let filtered = items;

      if (price != null && price !== "") {
        filtered = filtered.filter((car) => {
          // можливі поля: car.price або car.rentalPrice (строка "$40" або число)
          let p = car.price ?? car.rentalPrice;
          if (typeof p === "string") {
            p = Number(p.replace(/[^0-9.]/g, ""));
          }
          return typeof p === "number" ? p >= Number(price) : false;
        });
      }

      if (mileageFrom != null && mileageFrom !== "") {
        filtered = filtered.filter((car) => {
          const m = Number(car.mileage ?? car.km ?? 0);
          return m >= Number(mileageFrom);
        });
      }

      if (mileageTo != null && mileageTo !== "") {
        filtered = filtered.filter((car) => {
          const m = Number(car.mileage ?? car.km ?? 0);
          return m <= Number(mileageTo);
        });
      }

      // повертаємо у форматі, якого очікує carsSlice
      return { cars: filtered, page, limit };
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Error";
      return thunkAPI.rejectWithValue(message);
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
      const message =
        error?.response?.data?.message || error.message || "Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
