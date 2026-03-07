const express=require("express");
const app=express();
const posts=require("./routes/post.js");
const user=require("./routes/user.js");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(function(req,res,next){
req.session.locals=req.flash("error"); 
req.session.locals=req.flash("success"); 

next();
})
app.use(session({
    secret:"super",
     resave:false,
     saveUninitialized:true, 

}));
app.use(flash());
app.get("/register",function(req,res){
    let {name}=req.query
  req.session.name=name
  req.flash("success","usser login");

  if(!req.session.name){
    req.flash("error","user was not succesfully registered")

}
else{
    req.flash("success","user was succesfully registered")
}
   res.redirect("/test");
})
app.get("/test",function(req,res){
  res.render("page.ejs",{name:req.session.name})
})
// app.use(cookieParser("secret"));

// app.get("/great",function(req,res){
//    let {name="anoynyms"}=req.cookies;
//     res.send(`hello ${name}`);
// })
// app.get("/set",function(req,res){
//     res.cookie("great","hello rahul");
//     res.send("we sent you a cookie");
// });

// app.get("/gets",function(req,res){
//     res.cookie("made-in","india",{signed:true});
//     res.send("send made inn details");
//     console.log(req.signedCookies)
// })


app.use("/post",posts);
app.use("/users",user);

app.listen(3000,function(){
    console.log("server is actibated in 3000");
});



