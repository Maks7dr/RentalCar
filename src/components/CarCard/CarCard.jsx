import { Link } from "react-router-dom";
import css from "./CarCards.module.css";
import { formatMileage } from "../utils/formatMileage";
import { parseAddress } from "../utils/parseAddress";

import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favorites/slice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

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

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.includes(id);

  return (
    <li className={css.item}>
      <div className={css.imageWrapper}>
        <img className={css.img} src={img} alt={brand} />
        <button
          className={css.favoriteBtn}
          onClick={() => dispatch(toggleFavorite(id))}
        >
          {isFavorite ? (
            <AiFillHeart className={css.heartFilled} />
          ) : (
            <AiOutlineHeart className={css.heartOutline} />
          )}
        </button>
      </div>
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
