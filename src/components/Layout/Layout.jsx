import { AppBar } from "../AppBar/AppBar";
import Hero from "../Hero/Hero";

export const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <Hero />
      <main>{children}</main>
    </>
  );
};
