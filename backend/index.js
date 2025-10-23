const express = require('express'); 
const app = express();
const cors = require("cors");
const CustomerRoutes = require("./Routes/CustomerRoute");
const TransactionRoute = require("./Routes/TransactionRoute");
const ownerRoutes = require("./Routes/OwnerRoute");
const paymentProofRoute = require("./Routes/PaymentProofRoute");
const connectDB = require('./Config/db');
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());

//  uploaded images 
app.use("/uploads", express.static("uploads"));

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/owner", ownerRoutes);
app.use("/api/customer", CustomerRoutes); 
app.use("/api/transaction", TransactionRoute);
app.use("/api/customer/paymentproof", paymentProofRoute);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
