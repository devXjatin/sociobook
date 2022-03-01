const express = require("express");
const connectDB = require("./config/database");
const app = express();
connectDB();

//import config dot.env file
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', require('./routes'))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
