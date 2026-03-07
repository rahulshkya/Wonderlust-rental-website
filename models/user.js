const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const listing = require('./model.js');
let userSchema=new Schema({
    email:{
        type:String,
       
    }
});


userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);