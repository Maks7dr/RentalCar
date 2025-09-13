// pages/CarDetailsPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCarById } from "../redux/cars/operations";
import { clearSelectedCar } from "../redux/cars/slice";
import {
  selectSelectedCar,
  selectLoading,
  selectError,
} from "../redux/cars/selectors";
import { Container } from "../Container/Container";
import css from "./DetailsPage.module.css";
import { formatMileage } from "../utils/formatMileage";
import { parseAddress } from "../utils/parseAddress";
import BookingForm from "../BookingForm/BookingForm";
import { IoLocationOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaCalendarAlt, FaCarSide, FaGasPump, FaCogs } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(selectSelectedCar);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCarById(id));

    return () => {
      dispatch(clearSelectedCar());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className={css.loaderContainer}>
        <ClipLoader
          color="#3470ff"
          loading={true}
          size={50}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }
  if (error) return <p>Помилка: {error}</p>;
  if (!car) return null;

  const formattedMileage = formatMileage(car.mileage);
  const { country, city } = parseAddress(car.address);

  return (
    <Container>
      <section className={css.details}>
        <div>
          <img className={css.img} src={car.img} alt={car.brand} width="512" />
          <BookingForm />
        </div>

        <div className={css.boxRight}>
          <div className={css.wrapper}>
            <h2 className={css.title}>
              {car.brand} {car.model}, {car.year}
            </h2>
            <p className={css.locations}>
              <IoLocationOutline />
              <span className={css.mb}>
                {city}, {country}
              </span>
              Mileage: {formattedMileage} km
            </p>
            <span className={css.price}>{car.rentalPrice}$</span>
            <p className={css.text}>{car.description}</p>
          </div>
          <div className={css.wrapperRight}>
            <div>
              <h3 className={css.subTitle}>Rental Conditions: </h3>
              <ul className={css.list}>
                {car.rentalConditions.map((item, index) => (
                  <li key={index} className={css.item}>
                    <IoCheckmarkCircleOutline />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={css.subTitle}>Car Specifications:</h3>
              <ul className={css.list}>
                <li className={css.item}>
                  <FaCalendarAlt />
                  Year: {car.year}
                </li>
                <li className={css.item}>
                  <FaCarSide />
                  Type: {car.type}
                </li>
                <li className={css.item}>
                  <FaGasPump />
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={css.item}>
                  <FaCogs />
                  Engine Size: {car.engineSize}
                </li>
              </ul>
            </div>
            <div>
              <h3 className={css.subTitle}>Accessories and functionalities:</h3>
              <ul className={css.list}>
                {car.accessories.map((item, index) => (
                  <li key={index} className={css.item}>
                    <IoCheckmarkCircleOutline />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default DetailsPage;
