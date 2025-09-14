import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchCars } from "../redux/cars/operations";
import { selectFilters } from "../redux/filters/selectors";
import { setFilters } from "../redux/filters/slice";
import { formatMileage } from "../utils/formatMileage";
import css from "./Filters.module.css";

const BRANDS = [
  "Aston Martin",
  "Audi",
  "BMW",
  "Bentley",
  "Buick",
  "Chevrolet",
  "Chrysler",
  "GMC",
  "HUMMER",
  "Hyundai",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lincoln",
  "MINI",
  "Mercedes-Benz",
  "Mitsubishi",
  "Nissan",
  "Pontiac",
  "Subaru",
  "Volvo",
];

const PRICES = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);

const Filters = () => {
  const dispatch = useDispatch();
  const savedFilters = useSelector(selectFilters);

  const [brand, setBrand] = useState(savedFilters.brand || "");
  const [price, setPrice] = useState(savedFilters.price || "");
  const [mileageFrom, setMileageFrom] = useState(
    savedFilters.mileageFrom || ""
  );
  const [mileageTo, setMileageTo] = useState(savedFilters.mileageTo || "");

  const hasActiveFilters = brand || price || mileageFrom || mileageTo;

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {
      brand: brand || null,
      price: price ? Number(price) : null,
      mileageFrom: mileageFrom ? Number(mileageFrom) : null,
      mileageTo: mileageTo ? Number(mileageTo) : null,
    };

    dispatch(setFilters(filters));

    dispatch(
      fetchCars({
        page: 1,
        limit: 12,
        ...filters,
      })
    );
  };

  const handleReset = () => {
    setBrand("");
    setPrice("");
    setMileageFrom("");
    setMileageTo("");

    dispatch(
      setFilters({
        brand: null,
        price: null,
        mileageFrom: null,
        mileageTo: null,
      })
    );

    dispatch(fetchCars({ page: 1, limit: 12 }));
  };

  return (
    <form
      className={css.container}
      onSubmit={handleSubmit}
      style={{ marginBottom: "20px" }}
    >
      <div className={css.wrapper}>
        <label className={css.label}>Car brand </label>
        <select
          className={css.select}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">Choose a brand</option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className={css.wrapper}>
        <label className={css.label}>Price / 1 hour </label>
        <select
          className={css.select}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="">Choose a price</option>
          {PRICES.map((p) => (
            <option key={p} value={p}>
              {p}$
            </option>
          ))}
        </select>
      </div>

      <div className={css.box}>
        <label className={css.wrapper}>
          Car mileage / km
          <input
            className={css.inputFirst}
            type="text"
            value={mileageFrom ? formatMileage(mileageFrom) : ""}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\s/g, ""); // прибираємо пробіли
              setMileageFrom(rawValue === "" ? "" : Number(rawValue));
            }}
            placeholder="From"
          />
        </label>
        <input
          className={css.inputSecond}
          type="text"
          value={mileageTo ? formatMileage(mileageTo) : ""}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/\s/g, "");
            setMileageTo(rawValue === "" ? "" : Number(rawValue));
          }}
          placeholder="To"
        />
      </div>
      <button className={css.button} type="submit">
        Search
      </button>

      {hasActiveFilters && (
        <button type="button" className={css.button} onClick={handleReset}>
          Reset
        </button>
      )}
    </form>
  );
};

export default Filters;
