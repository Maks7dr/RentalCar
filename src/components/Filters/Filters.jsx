import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setBrand,
  setPrice,
  setMileageFrom,
  setMileageTo,
  resetFilters,
} from "../redux/filters/slice";
import { fetchCars } from "../redux/cars/operations";
import css from "./Filters.module.css";
import { Container } from "../Container/Container";
import { formatMileage } from "../utils/formatMileage";

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
  const [brand, setLocalBrand] = useState("");
  const [price, setLocalPrice] = useState("");
  const [mileageFrom, setLocalMileageFrom] = useState("");
  const [mileageTo, setLocalMileageTo] = useState("");
  const [showReset, setShowReset] = useState(false);

  const handleSearch = () => {
    console.log("SEARCH clicked");
    dispatch(setBrand(brand));
    dispatch(setPrice(Number(price) || ""));
    dispatch(
      setMileageFrom(mileageFrom ? Number(mileageFrom.replace(/\s/g, "")) : "")
    );
    dispatch(
      setMileageTo(mileageTo ? Number(mileageTo.replace(/\s/g, "")) : "")
    );

    dispatch(fetchCars({ page: 1, limit: 12 }));
    setShowReset(true);
    console.log("showReset:", true);
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setLocalBrand("");
    setLocalPrice("");
    setLocalMileageFrom("");
    setLocalMileageTo("");
    dispatch(fetchCars({ page: 1, limit: 12 }));
    setShowReset(false);
  };

  const handleMileageChange = (setter) => (e) => {
    const raw = e.target.value.replace(/\s/g, "");
    if (!/^\d*$/.test(raw)) return;
    setter(raw ? formatMileage(Number(raw)) : "");
  };

  return (
    <Container className={css.container}>
      <div className={css.filters}>
        <select
          className={css.select}
          value={brand}
          onChange={(e) => setLocalBrand(e.target.value)}
        >
          <option value="">Choose a brand</option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          className={css.select}
          value={price}
          onChange={(e) => setLocalPrice(e.target.value)}
        >
          <option value="">Choose a price</option>
          {PRICES.map((p) => (
            <option key={p} value={p}>
              {p}$
            </option>
          ))}
        </select>

        <input
          className={css.inputFirst}
          type="text"
          placeholder="From"
          value={mileageFrom}
          onChange={handleMileageChange(setLocalMileageFrom)}
        />
        <input
          className={css.inputSecond}
          type="text"
          placeholder="To"
          value={mileageTo}
          onChange={handleMileageChange(setLocalMileageTo)}
        />

        <button className={css.button} onClick={handleSearch}>
          Search
        </button>
        {showReset && (
          <button className={css.button} onClick={handleReset}>
            Reset
          </button>
        )}
      </div>
    </Container>
  );
};

export default Filters;
