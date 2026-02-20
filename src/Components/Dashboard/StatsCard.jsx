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
  const data = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        borderColor: color,
        backgroundColor: color || "#000",
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
    <div
      className="stat-card"
      style={{ borderBottom: `3px solid ${coin?.color}` }}
    >
      <div className="stat-header">
        <img src={coin?.icon} alt={coin?.name} />
        <div>
          <span className="coin-name">{coin?.name}</span>
          <span className="coin-symbol">{coin?.symbol}</span>
        </div>
      </div>
      <div className="stat-price">{coin?.price?.toLocaleString()}</div>
      <div className="stat-chart">
        <div
          style={{
            height: "50px",
            background: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Doughnut options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
