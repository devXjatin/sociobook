const express = require("express");
const connectDB = require("./config/database");
const app = express();
connectDB();
//import config dot.env file
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/config.env" });
}


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
