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
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(getUser());
  const [cryptoData, setCryptoData] = useState([]);
  useEffect(() => {
    async function getCryptoData() {
      try {
        const data = await cryptoApi.getAll();
        setCryptoData(data);
        console.log("Data result", data);
      } catch (error) {
        console.error("Failed to fetch crypto data:", error);
        setCryptoData([]);
      } finally {
        setIsLoading(false);
      }
    }
    if (user) {
      getCryptoData();
    }
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
                isLoading={isLoading}
              />
            }
          />
          <Route path="/news" element={<CryptoNewsPage />} />
          <Route
            path="/crypto/:symbol"
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
