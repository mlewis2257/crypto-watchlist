import React from "react";
import { useParams } from "react-router";
import NavBar from "../../Components/NavBar/NavBar";

const CryptoDetailPage = ({ cryptoData }) => {
  let { cryptoname } = useParams();
  let crypto = cryptoData.find((c) => c.name === cryptoname);
  return (
    <div>
      <NavBar />
      <div>
        <h1>{crypto.name}</h1>
        <h1>{`$${crypto.price}`}</h1>
        <h4>{`${crypto.priceChange1h}%`}</h4>
      </div>
      <div>Chart</div>
      <div>News</div>
    </div>
  );
};

export default CryptoDetailPage;
