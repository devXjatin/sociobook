const mongoose = require('mongoose');
require("dotenv").config({ path: "./config/config.env" });

const connectDatabase = ()=>{
     mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
     }).then((con)=>{
        console.log(`Database Connected ${con.connection.host}`);
    }).catch((err)=>{
        console.log(`Databse is not connected ${err}`);
    })
}

module.exports = connectDatabase;