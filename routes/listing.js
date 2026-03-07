const express=require("express");
const router=express.Router();
const path = require("path");
const mongoose = require("mongoose");
const listing = require("../models/model.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("../utilis/wrapAsync.js");
const ExpressError = require("../utilis/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Review=require("../models/review.js");
const passport=require("passport");
const {islogged}=require("../middleware.js")
const {isOwner}=require("../middleware.js")
const {index,rendernewform,newlisting,showlisting,updatelisting,deletelisting,updateform}=require("../controllers/listing.js")
const multer=require("multer");
const {storage}=require("../cloudconfg.js")
const upload=multer({storage})
// Routes
const validate = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    throw new ExpressError(400, error.details[0].message); 
  } else {
    next();
  } 
};  
router.get("/",wrapAsync(index));  
router.route("/new") 
   .get(islogged,rendernewform)
   .post(validate,upload.single("list[image]"), wrapAsync(newlisting))   
router.get("/:id",islogged,wrapAsync(showlisting));                
router.route("/:id/update")
    .get(islogged, wrapAsync(updateform))
    .patch(islogged,isOwner,upload.single("list[image]"),wrapAsync(updatelisting))
router.delete("/:id",islogged,isOwner,wrapAsync(deletelisting));
module.exports=router;