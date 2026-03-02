import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const MainChart = () => {
  const chartRef = useRef(null);
  const [chartdata, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(0, 229, 255, 0.2)");
    gradient.addColorStop(1, "rgba(0, 229, 255, 0)");

    setChartData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      datasets: [
        {
          label: "Market Volume",
          borderColor: "#00E5FF",
          borderWidth: 3,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: "#00E5FF",
          pointHoverBorderColor: "#fff",
        },
      ],
    });
  }, []);

  const mainChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#00E5FF",
        bodyColor: "#fff",
        displayColors: false,
      },
    },
    scales: {
      y: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "rgba(255,255,255,0.4)" },
      },
      x: {
        grid: { display: false },
        ticks: { color: "rgba(255,255,255,0.4)" },
      },
    },
  };

  return (
    <div className="main-chart-container">
      <div className="canvas-wrapper">
        <Line ref={chartRef} data={chartdata} options={mainChartOptions} />
      </div>
    </div>
  );
};

export default MainChart;
