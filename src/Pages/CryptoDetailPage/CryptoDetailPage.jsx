import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../../Components/NavBar/NavBar";
import * as cryptoAPI from "../../Utilities/coins-api";
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
import { Line } from "react-chartjs-2";
import "./CryptoDetailPage.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoDetailPage = ({ cryptoData, setCryptoData }) => {
  const [marketData, setMarketData] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const { id } = useParams();
  const cryptoId = parseInt(id);
  const crypto = cryptoData[cryptoId];
  const idx = crypto.id;

  function numFormat(num) {
    const decimalPlaces = num > 0 ? 2 : 5;
    return parseFloat(num.toFixed(decimalPlaces)).toLocaleString();
  }
  function getColorClass(value) {
    return value >= 0 ? "positive" : "negative";
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    async function getNews() {
      const newsData = await cryptoAPI.getArticleData(idx);
      setNewsArticles(newsData);
      console.log(newsData);
    }
    getNews();
  }, [idx]);

  useEffect(() => {
    async function getChartData() {
      const data = await cryptoAPI.getMarketData(idx);
      setMarketData(data);
      console.log(data);
    }
    getChartData();
  }, [idx]);

  const dateArr = marketData.map(function (entry) {
    const num = entry[0] * 1000;
    const date = new Date(num);
    const months = date.getMonth();
    return monthNames[months];
  });

  console.log(newsArticles);

  const chartData = {
    labels: dateArr,
    datasets: [
      {
        label: `${crypto.name} Price`,
        data: marketData,
        fill: false,
        borderColor: "rgb(255, 0, 0)",
        backgroundColor: "rgb(255, 0, 0,0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Market Data",
      },
    },
  };
  return (
    <>
      <NavBar />
      <div className="container">
        <section>
          <div className="crypto-div">
            <h1>
              <img src={`${crypto.icon}`} alt={`${crypto.name} icon`} />
              {`${crypto.name} ${crypto.symbol}`}
            </h1>
            <h2>{`$${numFormat(crypto.price)}`}</h2>
            <div>
              <h3>1h Price Change:</h3>
              <h4 className={getColorClass(crypto.priceChange1h)}>
                {`${crypto.priceChange1h}%`}
              </h4>
              <h3>1d Price Change:</h3>
              <h4 className={getColorClass(crypto.priceChange1d)}>
                {`${crypto.priceChange1d}%`}
              </h4>
              <h3>1w Price Change:</h3>
              <h4 className={getColorClass(crypto.priceChange1w)}>
                {`${crypto.priceChange1w}%`}
              </h4>
            </div>
            <div>
              <h3>Rank #</h3>
              <h4>{crypto.rank}</h4>
            </div>
            <div>
              <h3>Market Cap</h3>
              <h5>{`$${numFormat(crypto.marketCap)}`}</h5>
            </div>
            <div>
              <h3>Available Supply</h3>
              <h5>{`${numFormat(crypto.availableSupply)}`}</h5>
            </div>
            <div>
              <h3>Total Supply</h3>
              <h5>{`${numFormat(crypto.totalSupply)}`}</h5>
            </div>
          </div>
          <div className="news-div"></div>
        </section>
        <div>
          <Line data={chartData} options={options} />
        </div>
      </div>
    </>
  );
};

export default CryptoDetailPage;
