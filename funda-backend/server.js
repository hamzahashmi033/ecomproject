const args = process.argv;

const path = require("path");

const express = require("express");
const logger = require("morgan");

const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const auth = require("./routes/auth");
const user = require("./routes/user");
const category = require("./routes/category");
const subCategory = require("./routes/subCategory");
const tags = require("./routes/tags");
const brands = require("./routes/brand");
const products = require("./routes/product");
const blog = require("./routes/blog");
const wishListRoute = require("./routes/wishList");
const orderRoute = require("./routes/order");
const uploadRoute = require("./routes/upload");

const bannerRouter = require("./routes/banner");

const voucher = require("./routes/voucher");

const deal = require("./routes/deal");
const trackOrderRouter = require("./routes/trackingRoute");
//Initialize express app
const app = express();

//Configuring the Environment Variables
dotenv.config();
// dotenv.config({ path: "./config/.env" });

// BODYPARSER MIDDLEWARE
app.use(express.json());

//CORS
app.use(cors());

app.use(logger("dev"));

// ROUTES
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/category", category);
app.use("/api/subcategory", subCategory);
app.use("/api/tag", tags);
app.use("/api/brand", brands);
app.use("/api/product", products);
app.use("/api/blog", blog);
app.use("/api/wish", wishListRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/banner", bannerRouter);

app.use("/api/voucher", voucher);
app.use("/api/deal", deal);
app.use("/api", trackOrderRouter);
//SERVE STATIC ASSET IF IN PRODUCTION

app.use("/assets", express.static("public"));

if (process.env.NODE_ENV === "production") {
  // SET STATIC FOLDER

  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use((error, req, res, next) => {
  const message = error.message;
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: message,
  });
});

//CONFIGURE PORT
const PORT = process.env.PORT || args[2] || 5000;
const server = app.listen(PORT, "0.0.0.0", () => {
  //Db connection
  connectDb();
  console.log(
    `Server running in "${process.env.NODE_ENV}" mode on port "${PORT}"`
  );
});

//Handle the promise rejection error
process.on("unhandledRejection", (err, promise) => {
  console.log("Error: ", err.message);
  server.close(() => process.exit(1));
});
