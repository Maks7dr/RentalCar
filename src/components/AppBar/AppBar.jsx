import { Link, NavLink } from "react-router-dom";

export const AppBar = () => {
  return (
    <header>
      <Link to="/">RentalCar</Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/catalog">Catalog</NavLink>
      </nav>
    </header>
  );
};
