import { Link } from "react-router-dom";
import { Container } from "../Container/Container";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <Container className={css.heroContainer}>
      <h1>Find your perfect rental car</h1>
      <p>Reliable and budget-friendly rentals for any journey</p>
      <Link to="/catalog">View Catalog</Link>
    </Container>
  );
}
