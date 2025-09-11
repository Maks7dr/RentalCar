import { AppBar } from "../AppBar/AppBar";

export const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <main>{children}</main>
    </>
  );
};
