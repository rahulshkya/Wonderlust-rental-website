const express=require("express");
const router=express.Router();


//user routes

router.get("/",function(req,res){
    res.send("get for users");
});
router.post("/",function(req,res){
    res.send("post for users");
});
router.get("/:id",function(req,res){
    res.send("get for users id");
});
router.delete("/:id/delete",function(req,res){
    res.send("this is a delete");
});

module.exports=router;