require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");


const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");


const errorhandler = require("./middleware/errorhandler");

const app = express();

app.use(cors());
app.use(express.json());


connectDB();


app.get("/", (req, res) => {
  res.send("NavaCart Server is running");
});


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorhandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


process.on("SIGINT", () => {
  console.log("Server stopped.");
  server.close(() => process.exit(0));
});

process.on("SIGTERM", () => {
  console.log("Server stopped.");
  server.close(() => process.exit(0));
});