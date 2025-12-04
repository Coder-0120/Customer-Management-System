import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GoldRateContext = createContext();

export const GoldRateProvider = ({ children }) => {
  const [rates, setRates] = useState({});
  const [usdToInr, setUsdToInr] = useState(88.2);
   // const fetchExchangeRate = async () => {
  //   try {
  //     const fxRes = await axios.get(
  //       "https://v6.exchangerate-api.com/v6/c4abc8c3ef3751eada122d87/latest/USD"
  //     );
  //     setUsdToInr(fxRes.data.conversion_rates.INR);
  //     console.log("Fetched new INR rate:", fxRes.data.conversion_rates.INR);
  //   } catch (err) {
  //     console.error("Error fetching INR rate", err);
  //   }
  // };


  const fetchGoldRate = async () => {
    try {
        
      const res = await axios.get("https://api.gold-api.com/price/XAU");
      let priceUSD = res.data.price;
      let gold24k = (priceUSD / 31.1035) * usdToInr + 900;
      let gold22k = gold24k * (22 / 24);
      let gold20k = gold24k * (20 / 24);
      let gold18k = gold24k * (18 / 24);

      setRates({
        gold24k: gold24k.toFixed(0),
        gold22k: gold22k.toFixed(0),
        gold20k: gold20k.toFixed(0),
        gold18k: gold18k.toFixed(0),
        updatedAt: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      console.error("Error fetching gold rate", err);
    }
  };

  useEffect(() => {
    fetchGoldRate();
    const interval = setInterval(fetchGoldRate, 60000); // refresh every 1 min
    return () => clearInterval(interval);
  },[]);

  //  Return Provider that wraps the app
  return (
    <GoldRateContext.Provider value={{ rates }}>
      {children}
    </GoldRateContext.Provider>
  );
};

//  Create custom hook for easy access
export const useGoldRates = () => useContext(GoldRateContext);
