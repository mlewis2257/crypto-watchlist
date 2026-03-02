import React from "react";

const BigStatsCard = ({ coin }) => {
  function badgeClass(value) {
    return value >= 0 ? "badgeUp" : "badgeDown";
  }

  return (
    <div className="coin-stats-container">
      <div className="coin-info">
        <span>
          <img src={coin?.icon} alt="coin symbol" />
        </span>
        <h4>{coin?.name}</h4>
        <h2>${coin?.price}</h2>
      </div>
      <div className="coin-percentages">
        <h5 className={`${badgeClass(coin?.priceChange1h)}`}>
          {coin?.priceChange1h}%
        </h5>
        <h5 className={`${badgeClass(coin?.priceChange1d)}`}>
          {coin?.priceChange1d}%
        </h5>
        <h5 className={`${badgeClass(coin?.priceChange1w)}`}>
          {coin?.priceChange1w}%
        </h5>
      </div>
      <div className="coin-volume">
        <h5>{coin?.volume}</h5>
        <h5>{coin?.marketCap}</h5>
        <h5>{coin?.fullyDilutedValuation}</h5>
      </div>
    </div>
  );
};

export default BigStatsCard;
