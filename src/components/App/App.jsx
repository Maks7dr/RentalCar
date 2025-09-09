// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "../Home/Home";
import { Catalog } from "../Catalog/Catalog";
import { Details } from "../Details/Details";
import { Layout } from "../Layout/Layout";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
