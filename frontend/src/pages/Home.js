import React from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Categories from "../components/Categories";
import ProductsLimit from "../components/ProductsLimit";
import Slider from "../components/Slider";
import HomeAdmin from "../admin/HomeAdmin";

const Home = () => {

  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar />
      {auth.isAdmin ? (
        <HomeAdmin />
      ) : (
        <>
          <Slider />
          <Categories />
          <ProductsLimit />
          <Newsletter />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;