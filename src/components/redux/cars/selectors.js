export const selectCars = (state) => state.cars.items;
export const selectSelectedCar = (state) => state.cars.selectedCar;
export const selectLoading = (state) => state.cars.isLoading;
export const selectError = (state) => state.cars.error;
export const selectCarsPage = (state) => state.cars.page;
export const selectCarsHasMore = (state) => state.cars.hasMore;
