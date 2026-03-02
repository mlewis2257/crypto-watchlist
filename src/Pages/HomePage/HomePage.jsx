import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import StatsCard from "../../Components/Dashboard/StatsCard";
import InitialValueChart from "../../Components/Dashboard/InitialValueChart";
import MainChart from "../../Components/Dashboard/MainChart";
import CryptoList from "../../Components/CryptoList/CryptoList";
import BigStatsCard from "../../Components/Dashboard/BigStatsCard";
import "./HomePage.css";

const HomePage = ({ user, setUser, cryptoData, setCryptoData, isLoading }) => {
  // Check if data is loaded
  if (isLoading) return <div className="loading">Loading...</div>;
  // Find specific coins from CMC data
  const btc = cryptoData?.find((c) => c.symbol === "BTC");
  const sol = cryptoData?.find((c) => c.symbol === "SOL");
  const eth = cryptoData?.find((c) => c.symbol === "ETH");
  const xrp = cryptoData?.find((c) => c.symbol === "XRP");
  console.log("Coin data:", btc);

  return (
    <NavBar user={user} setUser={setUser}>
      <div className="dashboard-container">
        <div className="dashboard-grid">
          {/* Top Row: Hero Area */}
          <section className="hero-area">
            <BigStatsCard coin={xrp} />
            <StatsCard coin={btc} color="#F7931A" />
            <StatsCard coin={sol} color="#14F195" />
            <StatsCard coin={eth} color="#00E5FF" />
          </section>
          {/* Middle Row: Main Chart Area */}
          <div className="main-chart-area glass-panel">
            <h3 className="chart-title">Market Overview</h3>
            <div className="canvas-wrapper">
              <MainChart />
            </div>
          </div>

          <div className="gauge-area glass-panel">
            <h4>Initial Coin Value</h4>
            <InitialValueChart
              value={50}
              label="Initial Value"
              color="#14F195"
            />
          </div>
        </div>

        {/* Bottom Section: Full Width Table */}
        <section className="market-table-section">
          <CryptoList cryptoData={cryptoData} setCryptoData={setCryptoData} />
        </section>
      </div>
    </NavBar>
  );
};

export default HomePage;
