import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../redux/cars/operations";
import {
  selectCars,
  selectLoading,
  selectError,
  selectCarsPage,
  selectCarsHasMore,
} from "../redux/cars/selectors";
import CarCard from "../CarCard/CarCard";
import { Container } from "../Container/Container";
import css from "./CatalogList.module.css";
import Filters from "../Filters/Filters";

const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const page = useSelector(selectCarsPage);
  const hasMore = useSelector(selectCarsHasMore);

  useEffect(() => {
    dispatch(fetchCars({ page: 1, limit: 12 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    if (isLoading || !hasMore) return;
    dispatch(fetchCars({ page: page + 1, limit: 12 }));
  };

  if (isLoading && cars.length === 0) return <p>Завантаження...</p>;
  if (error && cars.length === 0) return <p>Помилка: {error}</p>;

  return (
    <Container>
      <Filters />
      <section>
        {cars.length === 0 ? (
          <p className={css.noResults}>Немає доступних транспортних засобів.</p>
        ) : (
          <ul className={css.list}>
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </ul>
        )}

        <div className={css.loadMoreWrapper}>
          {isLoading && cars.length > 0 && (
            <p>Завантаження додаткових авто...</p>
          )}
          {hasMore && (
            <button
              className={css.loadMoreButton}
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </section>
    </Container>
  );
};

export default CarList;
