 const mongoose=require("mongoose");
 const {listings}=require("./data.js");
 const model=require("../models/model.js");

 async function main(){
     await mongoose.connect("mongodb://localhost:27017/majorProject")
 }
 
 main().then(()=>{
     console.log("mongoDB is established");
 })

const initDB=async function(){
    await model.deleteMany({})
    const updatedListings = listings.map((obj)=>({...obj,owner:'69328b8ca95ea9b611255f8a'}));
    await model.insertMany(updatedListings || listings);
    console.log("data was intialize");
}

 initDB();
 