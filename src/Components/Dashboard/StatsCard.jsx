import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./StatsCard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const StatsCard = ({ coin, color }) => {
  function numFormat(num) {
    const decimalPlaces = num > 0 ? 2 : 6;
    return parseFloat(num.toFixed(decimalPlaces)).toLocaleString();
  }
  function badgeClass(value) {
    return value >= 0 ? "badgeUp" : "badgeDown";
  }
  //   Handle case where coin is undefined or null
  if (!coin || !coin.name || !coin.symbol) {
    return (
      <div
        className="stats-card"
        style={{ borderBottom: `3px solid ${color || "#ccc"}` }}
      >
        <div className="stat-header">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  const getGradient = (context) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 80);
    gradient.addColorStop(0, `${color}33`);
    gradient.addColorStop(0, `${color}00`);
    return gradient;
  };
  const data = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        borderColor: color,
        backgroundColor: getGradient || "#000",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    reponsive: true,
    mainAspectRation: false,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
  };
  return (
    <div className="stats-card">
      <div className="stat-header">
        <img className="icon" src={coin?.icon} alt={coin?.name} />
        <div className="coin-text">
          <span className="coin-symbol">{coin?.symbol}</span>
          <span className="coin-name">{coin?.name}</span>
        </div>
      </div>
      <div className="stat-price">${numFormat(coin?.price)}</div>
      <div className="percentage">
        24hr
        <span className={`${badgeClass(coin?.priceChange1d)} percent-span`}>
          {coin?.priceChange1d}%
        </span>
      </div>
      <div className="stat-chart">
        <div
        //   style={{
        //     height: "50px",
        //     background: "#f0f0f0",
        //     display: "flex",
        //     alignItems: "center",
        //     justifyContent: "center",
        //   }}
        ></div>
      </div>
    </div>
  );
};

export default StatsCard;
