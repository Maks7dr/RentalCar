import { Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "../pages/HomePage";
import { CatalogPage } from "../pages/CatalogPage";
import DetailsPage from "../pages/DetailsPage";
import { Layout } from "../Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />} />
        </Routes>
        <ToastContainer />
      </Layout>
    </>
  );
}

export default App;
