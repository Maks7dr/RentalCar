import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const getActiveLink = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const Navigation = () => {
  return (
    <nav>
      <ul className={css.nav}>
        <li className={css.item}>
          <NavLink className={getActiveLink} to="/">
            Home
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink className={getActiveLink} to="/catalog">
            Catalog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
