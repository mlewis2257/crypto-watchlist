import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import StatsCard from "../../Components/Dashboard/StatsCard";
import InitialValueChart from "../../Components/Dashboard/InitialValueChart";
import CryptoList from "../../Components/CryptoList/CryptoList";

const HomePage = ({ user, setUser, cryptoData, setCryptoData, isLoading }) => {
  // Check if data is loaded
  if (isLoading) return <div>Loading...</div>;
  // Find specific coins from CMC data
  const btc = cryptoData?.find((c) => c.symbol === "BTC");
  const sol = cryptoData?.find((c) => c.symbol === "SOL");
  const eth = cryptoData?.find((c) => c.symbol === "ETH");
  console.log("Coin data:", btc);

  return (
    <div style={{ backgroundImage: "src/assets/background-image.png" }}>
      <NavBar user={user} setUser={setUser}>
        <div className="dashboard-grid">
          {/* Top section of Dashboard: Stats Card */}
          <section className="top-stats">
            <StatsCard coin={btc} color="#F7931A" />
            <StatsCard coin={sol} color="#14F195" />
            <StatsCard coin={eth} color="#FFA500" />
          </section>
          <section className="middle-charts">
            <div className="mid"></div>
            <div></div>
          </section>
        </div>
      </NavBar>
      <CryptoList cryptoData={cryptoData} setCryptoData={setCryptoData} />
    </div>
  );
};

export default HomePage;
