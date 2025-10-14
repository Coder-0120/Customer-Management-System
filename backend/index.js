const express = require('express'); 
const app=express();
const cors=require("cors");
const CustomerRouter=require("./Routes/CustomerRouter");
const connectDB = require('./Config/db');
const dotenv=require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());
connectDB();
app.get("/",(req,res)=>{
    res.send("API is running...");
})
app.use("/api/customer",CustomerRouter); // http://localhost:5000/api/customer/register
app.listen(5000,()=>{
    console.log("Server started on port 5000");
});
