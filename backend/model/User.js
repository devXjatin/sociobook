const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter your name"]
    },
    avatar:{
        public_id:String,
        url:String,
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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model("User", userSchema);