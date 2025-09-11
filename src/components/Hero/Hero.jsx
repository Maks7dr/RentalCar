import { Link } from "react-router-dom";
import { Container } from "../Container/Container";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <Container className={css.heroContainer}>
      <section className={css.hero}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link className={css.link} to="/catalog">
          View Catalog
        </Link>
      </section>
    </Container>
  );
}
