if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}


const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const listing = require("./models/model.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utilis/wrapAsync.js");
const ExpressError = require("./utilis/ExpressError.js");
const {listingSchema}=require("./schema.js");
const Review=require("./models/review.js");
const listings=require("./routes/listing.js");
const review=require("./routes/review.js");
const userroute=require("./routes/user.js");
const session=require("express-session");
const flash=require("connect-flash");
const User=require("./models/user.js");
const passport=require("passport");
const localStrategy=require("passport-local");
const multer=require("multer");
const upload=multer({dest:"uploads/"})

app.use(session({
  secret:"mysecret",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user; 
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
// View engine setup
app.engine("ejs", ejsMate);-
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
async function main() {
  await mongoose.connect("mongodb://localhost:27017/majorProject");
}
main().then(() => {
  console.log("mongoDB is established");
});
                                                                                                                                                                                                                                                                                                          
// Server start
app.listen(8080, () => {
  console.log("server is activated");
});
app.get("/demoUser",async function(req,res){
  let fakeUser=new User({
    email:"student@gmail.com",
    username:"delta-student",
  });
 let register=await User.register(fakeUser,"rahul12");
 res.send(register);
})
app.use("/listing",listings);
app.use("/listing/:id/review",review);
app.use("/",userroute);


// Error handler
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  const { status = 500, message = "Something went wrong" } = err; 
  console.log("Rendering error page:", status, message);
  res.status(status).render("listings/error", { status, message });
});
// 404 handler
app.use((req, res, next) => {
  next(new ExpressError(404,"Page not found" ));
});

