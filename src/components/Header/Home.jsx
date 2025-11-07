import React, { useRef } from "react";
import Navbar from "../Header/Navbar";
import Partner from "../Partner";
import Products from "../../pages/Products/Products";
import Collab from "../../pages/Collab";
import Choose from "../../pages/choose_card/Choose";
import Footer from "../../pages/Footer";
import EMICalculator from "../../pages/Emi/EMICalculator";
import OfferManagement from "../../pages/choose_card/Offermanagement";

function Home() {
  const productsRef = useRef(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      {/* Pass function as prop */}
      <Partner scrollToProducts={scrollToProducts} />
      <div ref={productsRef}>
        <Products />
      </div>
      <OfferManagement />
      <EMICalculator />
      <Collab />
      <Choose />
      <Footer />
    </>
  );
}

export default Home;
