import { Link, NavLink } from "react-router-dom";
import { Container } from "../Container/Container";
import Icon from "../Icon/Icon";
import css from "./AppBar.module.css";

export const AppBar = () => {
  return (
    <header className={css.header}>
      <Container className={css.headerContainer}>
        <Link to="/">
          <Icon name="Logo" className={css.logo} />
        </Link>
        <nav className={css.nav}>
          <NavLink className={css.link} to="/">
            Home
          </NavLink>
          <NavLink className={css.link} to="/catalog">
            Catalog
          </NavLink>
        </nav>
      </Container>
    </header>
  );
};
