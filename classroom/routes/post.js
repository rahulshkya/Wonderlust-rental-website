const express=require("express");
const router=express.Router();

//post routes
router.get("/",function(req,res){
    res.send("this is a post route");
});
router.get("/:id",function(req,res){
    res.send("get for post id");
});
router.post("/",function(req,res){
    res.send("post for post");
});
router.post("/:id",function(req,res){
    res.send("post for post id");
});

module.exports=router;