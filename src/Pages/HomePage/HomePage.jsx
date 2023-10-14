import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import CryptoList from "../../Components/CryptoList/CryptoList";

const HomePage = ({ cryptoData, setCryptoData }) => {
  return (
    <div>
      <NavBar />
      <br />
      <CryptoList cryptoData={cryptoData} setCryptoData={setCryptoData} />
    </div>
  );
};

export default HomePage;
