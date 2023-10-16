import { useState, useEffect } from "react";
import { getUser } from "../../Utilities/users-service";
import * as cryptoApi from "../../Utilities/coins-api";
import AuthPage from "../AuthPage/AuthPage";
import CryptoDetailPage from "../CryptoDetailPage/CryptoDetailPage";
import CryptoNewsPage from "../CryptoNewsPage/CryptoNewsPage";
import HomePage from "../HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [user, setUser] = useState(getUser());
  const [cryptoData, setCryptoData] = useState([]);
  useEffect(() => {
    async function getCryptoData() {
      const coinData = await cryptoApi.getAll();
      console.log(coinData);
      setCryptoData(coinData);
    }
    getCryptoData();
  }, [user]);

  return (
    <main className="App">
      {user ? (
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                cryptoData={cryptoData}
                setCryptoData={setCryptoData}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route path="/news" element={<CryptoNewsPage />} />
          <Route
            path="/crypto/:id"
            element={
              <CryptoDetailPage
                cryptoData={cryptoData}
                setCryptoData={setCryptoData}
              />
            }
          />
        </Routes>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
