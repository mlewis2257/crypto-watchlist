import React, { useEffect } from "react";
import { useParams } from "react-router";
import NavBar from "../../Components/NavBar/NavBar";
import "./CryptoDetailPage.css";

const CryptoDetailPage = ({ cryptoData, setCryptoData }) => {
  const { id } = useParams();
  const cryptoId = parseInt(id);
  const crypto = cryptoData[cryptoId];

  return (
    <div>
      <NavBar />
      <div>
        <h1>
          <img src={`${crypto.icon}`} alt="" />
          {`${crypto.name}`}
        </h1>
        <h1>{crypto.price}</h1>
        <h4>{crypto.rank}</h4>
      </div>
      <div>Chart</div>
      <div>News</div>
    </div>
  );
};

export default CryptoDetailPage;
