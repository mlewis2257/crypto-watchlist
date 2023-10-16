import React from "react";
import { Link } from "react-router-dom";
import "./CryptoList.css";
import CryptoDetailPage from "../../Pages/CryptoDetailPage/CryptoDetailPage";

const CryptoList = ({ cryptoData, setCryptoData }) => {
  function numFormat(num) {
    const decimalPlaces = num > 0 ? 2 : 5;
    return parseFloat(num.toFixed(decimalPlaces)).toLocaleString();
  }
  function getColorClass(value) {
    return value >= 0 ? "positive" : "negative";
  }
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
        <td>{`$${numFormat(crypto.price)}`}</td>
        <td
          className={getColorClass(crypto.priceChange1h)}
        >{`${crypto.priceChange1h}%`}</td>
        <td
          className={getColorClass(crypto.priceChange1d)}
        >{`${crypto.priceChange1d}%`}</td>
        <td
          className={getColorClass(crypto.priceChange1w)}
        >{`${crypto.priceChange1w}%`}</td>
        <td>{`$${numFormat(crypto.marketCap)}`}</td>
        <td>{`$${numFormat(crypto.volume)}`}</td>
        <td>{`${numFormat(crypto.availableSupply)} ${crypto.symbol}`}</td>
        <td>{`${numFormat(crypto.totalSupply)} ${crypto.symbol}`}</td>
      </tr>
    );
  });
  <CryptoDetailPage
    cryptoData={cryptoData}
    setCryptoData={setCryptoData}
    numFormat={numFormat}
  />;
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
