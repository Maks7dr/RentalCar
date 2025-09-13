import React from "react";
import { Link } from "react-router-dom";
import css from "./CarCards.module.css";
import { formatMileage } from "../utils/formatMileage";
import { parseAddress } from "../utils/parseAddress";

const CarCard = ({ car }) => {
  const {
    id,
    year,
    brand,
    model,
    type,
    img,
    rentalPrice,
    rentalCompany,
    address,
    mileage,
  } = car;

  const formattedMileage = formatMileage(mileage);
  const { country, city } = parseAddress(address);

  return (
    <li className={css.item}>
      <img className={css.img} src={img} alt={brand} />
      <div className={css.wrapper}>
        <h3 className={css.title}>
          {brand} <span className={css.color}>{model}</span>, {year}
        </h3>
        <span className={css.price}>${rentalPrice}</span>
      </div>
      <p className={css.box}>
        {city} | {country} | {rentalCompany}
      </p>
      <p className={css.secondBox}>
        {type} | {formattedMileage} km
      </p>
      <Link to={`/catalog/${id}`} className={css.readMore}>
        Read more
      </Link>
    </li>
  );
};

export default CarCard;
