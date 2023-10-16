import React from "react";
import { Link } from "react-router-dom";
import "./CryptoList.css";
import CryptoDetailPage from "../../Pages/CryptoDetailPage/CryptoDetailPage";

const CryptoList = ({ cryptoData, setCryptoData }) => {
  const cryptos = cryptoData.map((crypto, idx) => {
    return (
      <tr className="table-data" key={idx}>
        <td>{crypto.rank}</td>
        <Link className="table-links" to={`/crypto/${idx}`}>
          <td>
            <img className="coin-image" src={crypto.icon} alt="" />
            <span style={{ fontStyle: "bold" }}>{crypto.name}</span>
          </td>
        </Link>
        <td>{`$${crypto.price}`}</td>
        <td>{`${crypto.priceChange1h}%`}</td>
        <td>{`${crypto.priceChange1d}%`}</td>
        <td>{`${crypto.priceChange1w}%`}</td>
        <td>{`$${crypto.marketCap}`}</td>
        <td>{`$${crypto.volume}`}</td>
        <td>{`${crypto.availableSupply} ${crypto.symbol}`}</td>
        <td>{`${crypto.totalSupply} ${crypto.symbol}`}</td>
      </tr>
    );
  });
  <CryptoDetailPage cryptoData={cryptoData} setCryptoData={setCryptoData} />;
  return (
    <>
      <div className="crypotlist-container">
        <table>
          <thead className="table-header">
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Price</th>
              <th>1h%</th>
              <th>1d%</th>
              <th>1w%</th>
              <th>Market Cap</th>
              <th>Volume</th>
              <th>Available Supply</th>
              <th>Total Supply</th>
            </tr>
          </thead>
          <tbody className="table-body">{cryptos}</tbody>
        </table>
      </div>
    </>
  );
};

export default CryptoList;
