const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your email"],
        unique:[true, "Email already Exists"]
    },
    password:{
        type:String,
        required:[true,"Please Enter password"],
        minlength:[6,"Enter 6 digits password"],
        select:false
    },
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }]

})

module.exports = mongoose.model("User", userSchema);