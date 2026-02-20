import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const InitialValueChart = ({ value, label, color }) => {
  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, "rgba(255, 255, 255, 0.05)"],
        borderWidth: 0,
        circumference: 270,
        rotation: 225,
        cutout: "85%",
        borderRadius: 10,
      },
    ],
  };
  return (
    <div className="guage=container">
      <Doughnut data={data} />
      <div className="guage-text">
        <span className="guage-value">{value}%</span>
        <span className="guage-label">{label}</span>
      </div>
    </div>
  );
};

export default InitialValueChart;
