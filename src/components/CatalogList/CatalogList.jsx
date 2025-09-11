import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../redux/cars/operations";
import {
  selectCars,
  selectLoading,
  selectError,
} from "../redux/cars/selectors";
import CarCard from "../CarCard/CarCard";
import { Container } from "../Container/Container";
import css from "./CatalogList.module.css";

const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCars({ page: 1, limit: 12 }));
  }, [dispatch]);

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <Container>
      <section>
        <ul className={css.list}>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>
      </section>
    </Container>
  );
};

export default CarList;
