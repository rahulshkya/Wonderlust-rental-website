const User=require("../models/user");
module.exports.signup=function(req,res){
    res.render("users/signup.ejs")
}

module.exports.postsignup=async function(req,res){
    let {email,username,password}=req.body;
    const newUser=new User({
        email,
        username
    });
    let  registered=await User.register(newUser,password)
    console.log(registered)

    req.flash("success","Successfully signed up 🎉🎉")
    res.redirect("/listing")
}
module.exports.loginrender=function(req,res){
    res.render("users/login.ejs");
}
module.exports.login=async (req, res) => {
    req.flash("success", "Welcome back 🎉🎉🎉🎉");
    res.redirect(res.locals.redirectUrl || "/listing");

}
module.exports.logout=function(req,res){
    req.logout(function(err){
        if(err){
            return next(err)
        }
        req.flash("success","you are looged out!");
            res.redirect("/listing");
    })
  }