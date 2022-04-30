const express = require("express");
const connectDB = require("./config/database");
const  cookieParser = require('cookie-parser')
const app = express();
const passport = require('passport')
 require('./config/passport-jwt');
connectDB();
const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

//import config dot.env file
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());

app.use('/', require('./routes'))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
