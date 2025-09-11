import { Link } from "react-router-dom";
import { Container } from "../Container/Container";
import { Navigation } from "../Navigation/Navigation";
import Icon from "../Icon/Icon";
import css from "./AppBar.module.css";

export const AppBar = () => {
  return (
    <header className={css.header}>
      <Container className={css.headerContainer}>
        <Link to="/">
          <Icon name="Logo" className={css.logo} />
        </Link>
        <Navigation />
      </Container>
    </header>
  );
};
