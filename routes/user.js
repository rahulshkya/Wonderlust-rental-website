const express=require("express");
const router = express.Router({ mergeParams: true });
const User=require("../models/user.js")
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js")
const {signup,postsignup,loginrender,login,logout}=require("../controllers/user.js");

router.route('/signup')
   .get(signup)
   .post(postsignup);
router.route("/login")
   .get(loginrender)
   .post(saveRedirectUrl,passport.authenticate("local", { failureRedirect: "/login", failureFlash:true }),login);
router.get("/logout",logout);
module.exports=router;
