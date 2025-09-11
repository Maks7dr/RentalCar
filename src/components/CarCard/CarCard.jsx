import React from "react";
import css from "./CarCards.module.css";

const CarCard = ({ car }) => {
  const {
    // id,
    year,
    brand,
    make,
    model,
    type,
    img,
    // description,
    rentalPrice,
    rentalCompany,
    address,
    mileage,
  } = car;

  const formattedMileage = new Intl.NumberFormat("uk-UA").format(mileage);

  let country = "";
  let city = "";

  if (address) {
    const parts = address.split(",").map((p) => p.trim());
    if (parts.length >= 2) {
      country = parts[2];
      city = parts[1];
    }
  }

  return (
    <li className={css.item}>
      <img className={css.img} src={img} alt={make} />
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
        {type} | {formattedMileage}
      </p>
    </li>
  );
};

export default CarCard;
