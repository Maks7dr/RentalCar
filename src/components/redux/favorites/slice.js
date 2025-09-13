import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("favorites", JSON.stringify(state));
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadFromLocalStorage(),
  reducers: {
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      if (state.includes(carId)) {
        const newState = state.filter((id) => id !== carId);
        saveToLocalStorage(newState);
        return newState;
      } else {
        const newState = [...state, carId];
        saveToLocalStorage(newState);
        return newState;
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
