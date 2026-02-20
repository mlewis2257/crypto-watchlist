import React from "react";
import { Link } from "react-router-dom";
import "./CryptoList.css";
// import CryptoDetailPage from "../../Pages/CryptoDetailPage/CryptoDetailPage";

const CryptoList = ({ cryptoData, setCryptoData }) => {
  function numFormat(num) {
    const decimalPlaces = num > 0 ? 2 : 6;
    return parseFloat(num.toFixed(decimalPlaces)).toLocaleString();
  }
  function badgeClass(value) {
    return value >= 0 ? "badgeUp" : "badgeDown";
  }

  return (
    <div className="tableCard">
      <div className="tableTop">
        <div>
          <div className="tableTitle">Market</div>
          <div className="tableSub">Top assets by MarketCap</div>
        </div>
      </div>

      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              <td>Rank</td>
              <td>Name</td>
              <td>Price</td>
              <td>1hr</td>
              <td>1d</td>
              <td>1w</td>
              <td>Market Cap</td>
              <td>Volume</td>
              <td>Circulating</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((c) => (
              <tr key={c.symbol} className="row">
                <td className="muted">{c.rank}</td>
                <td>
                  <Link className="coinLink" to={`crypto/${c.symbol}`}>
                    <img
                      className="coinImage"
                      src={c.icon}
                      alt={`${c.name} icon`}
                    />
                    <div className="coinMeta">
                      <div className="coinName">{c.name}</div>
                      <div className="coinSym">{c.symbol}</div>
                    </div>
                  </Link>
                </td>
                <td>${numFormat(c.price)}</td>
                <td>
                  <span className={badgeClass(c.priceChange1h)}>
                    {c.priceChange1h}
                  </span>
                </td>
                <td>
                  <span className={badgeClass(c.priceChange1d)}>
                    {c.priceChange1d}
                  </span>
                </td>
                <td>
                  <span className={badgeClass(c.priceChange1w)}>
                    {c.priceChange1w}
                  </span>
                </td>
                <td className="muted">
                  ${Number(c.marketCap).toLocaleString()}
                </td>
                <td className="muted">${Number(c.volume).toLocaleString()}</td>
                <td className="muted">
                  {Number(c.availableSupply).toLocaleString()}
                </td>
                <td className="muted">
                  {Number(c.totalSupply).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList;
