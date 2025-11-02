import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import rates from "../Pages/GoldRatePage";

const DigitalGold = () => {
    const[buyAmount,setBuyAmount]=useState("");
    const[buyWeight,setBuyWeight]=useState("");
    const[sellWeight,setSellWeight]=useState("");
    const[sellAmount,setSellAmount]=useState("");
    const navigate=useNavigate();
    const [rates, setRates] = useState([]);
  const [usdToInr, setUsdToInr] = useState(88.2);

  const fetchExchangeRate = async () => {
    try {
      const fxRes = await axios.get(
        "https://v6.exchangerate-api.com/v6/c4abc8c3ef3751eada122d87/latest/USD"
      );
      setUsdToInr(fxRes.data.conversion_rates.INR);
      console.log("Fetched new INR rate:", fxRes.data.conversion_rates.INR);
    } catch (err) {
      console.error("Error fetching INR rate", err);
    }
  };

  const fetchGoldRate = async () => {
    try {
      const res = await axios.get("https://api.gold-api.com/price/XAU");
      let priceUSD = res.data.price;

      let gold24k = ((priceUSD / 31.1035) * usdToInr) + 900;
      let gold22k = gold24k * (22 / 24);
      let gold20k = gold24k * (20 / 24);
      let gold18k = gold24k * (18 / 24);

      setRates({
        gold24k: gold24k.toFixed(0),
        gold22k: gold22k.toFixed(0),
        gold20k: gold20k.toFixed(0),
        gold18k: gold18k.toFixed(0),
        updatedAt: new Date().toLocaleTimeString(),
        updatedAtReadable: res.data.updatedAtReadable,
      });
    } catch (err) {
      console.error("Error fetching gold rate", err);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
    const fxInterval = setInterval(fetchExchangeRate, 24 * 60 * 60 * 1000);
    return () => clearInterval(fxInterval);
  }, []);

  useEffect(() => {
    fetchGoldRate();
    const goldInterval = setInterval(fetchGoldRate, 1000);
    return () => clearInterval(goldInterval);
  }, [usdToInr]);
  const handleBuyWeightChange=(e)=>{
      setBuyWeight(e.target.value);
      setBuyAmount((e.target.value * rates.gold24k).toFixed(2));
  }
    const handleBuyAmountChange=(e)=>{
        setBuyAmount(e.target.value);
        setBuyWeight((e.target.value / rates.gold24k).toFixed(2));

    }
  const handleSellWeightChange=(e)=>{
      setSellWeight(e.target.value);
      setSellAmount((e.target.value * rates.gold24k).toFixed(2));
  }
    const handleSellAmountChange=(e)=>{
        setSellAmount(e.target.value);
        setSellWeight((e.target.value / rates.gold24k).toFixed(2));

    }

  return (
     <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
        <div style={{marginRight:"0px",top:"0px"}}>
            <p style={{ color: "#D4AF37", fontWeight: "700" }}>Digital Gold Available: 2 gram</p>
            <p style={{ color: "#D4AF37", fontWeight: "700" }}>Total Worth: 1000</p>
            {/* <h1 style={{ color: "#D4AF37", fontWeight: "700" }}>rates {JSON.stringify(rates.gold24k)}</h1> */}
        </div>
        <div style={{display:"flex",width:"100%",height:"300px",gap:"20px"}}>
            <div className='buy-digital-gold' style={{border:"2px solid #D4AF37",padding:"20px",width:"50%"}}>
                <p style={{ color: "#D4AF37", fontWeight: "700" }}>Buy Digital Gold</p>
              
                <br></br>
                <label style={{color:"white"}}>Amount in INR</label>
                <input type='number' placeholder='Enter amount in INR' value={buyAmount} onChange={handleBuyAmountChange} />
                <br></br>
                  <label style={{color:"white"}}>Weight (grams)</label>

                <input type="number" placeholder="Enter weight in grams" value={buyWeight} onChange={handleBuyWeightChange} />
                <br></br>
                <button style={{
                    color: "#fff",
                    background: "#D4AF37",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "15px",
                    cursor: "pointer"
                }}
                onClick={()=>navigate("/payment",
                    {state:{
                        DigitalGoldAmount:buyAmount,
                        DigitalGoldWeight:buyWeight
                    }}
                )}
                >Buy</button>
            </div>
            <div className='sell-digital-gold' style={{border:"2px solid #D4AF37",padding:"20px",width:"50%"}}>
                <p style={{ color: "#D4AF37", fontWeight: "700" }}>Sell Digital Gold</p>
                <label style={{color:"white"}}>Weight (grams)</label>
                <input type='number' placeholder='Enter weight of gold in grams' value={sellWeight} onChange={handleSellWeightChange} />
                <br></br>
                <label style={{color:"white"}}>Amount in INR</label>
                <input type="number" placeholder="Enter amount in INR" value={sellAmount} onChange={handleSellAmountChange} />
                <br></br>
                <br></br>
                <button style={{
                    color: "#fff",
                    background: "#D4AF37",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "15px",
                    cursor: "pointer"
                }}>Sell</button>
            </div>
        </div>
    </div>
  )
}

export default DigitalGold