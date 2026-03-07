const listing = require("../models/model.js");
const ExpressError = require("../utilis/ExpressError.js");
module.exports.index=async (req, res) => {
    const allListing = await listing.find({});
    res.render("listings/index", { allListing });
  }

  module.exports.rendernewform=(req, res,next) => {
    res.render("listings/new");
  }

  module.exports.newlisting=async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    const Newlisting = req.body.list;

    console.log("Parsed list:", Newlisting);
  
    // Create listing object
    const listObj = new listing(Newlisting);
  listObj.image={url,filename}
    // Assign owner
    listObj.owner.push(req.user._id);
   
    // Save the listing with owner included
    await listObj.save();
  
    req.flash("success", "New listing created");
    return res.redirect("/listing");
  }

module.exports.showlisting = async (req, res) => {
    const { id } = req.params;
    const post = await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");// <-- FIX: Populate reviews
    if (!post) throw new ExpressError( 404,"Listing not found");
    console.log(post);
    res.render("listings/show", { post });
  }

  module.exports.updateform=async (req, res) => {
    const { id } = req.params;
    const update = await listing.findById(id);
    if (!update) throw new ExpressError(404,"Listing not found");
    res.render("listings/edit", { update });
  }
  module.exports.updatelisting=async (req, res) => {
    const { id } = req.params;
  let listings = await listing.findByIdAndUpdate(id, { ...req.body.list });
if(typeof req.file !== "undefined"){
   let url=req.file.path;
    let filename=req.file.filename;

    listings.image={url,filename}
     
    await listings.save();
}
   

    req.flash("success","Listing was Edited");
    res.redirect(`/listing/${id}`);
  }

  module.exports.deletelisting=async (req, res) => {
    const { id } = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Listing was deleted")
    res.redirect("/listing");
    
  }