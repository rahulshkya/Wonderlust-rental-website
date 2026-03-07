const express=require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const listing = require("../models/model.js");
const ejsMate = require("ejs-mate");
const wrapAsync = require("../utilis/wrapAsync.js");
const ExpressError = require("../utilis/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Review = require("../models/review.js");
const {validateReview,islogged,isreviewAuthor}=require("../middleware.js");
const {review,reviewdelete}=require("../controllers/review.js")


//review 
router.post("/", islogged,wrapAsync(review));
router.delete("/:reviewid",isreviewAuthor,islogged,reviewdelete);

module.exports=router;