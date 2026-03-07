const Review=require("../models/review.js")
const listing=require("../models/model.js")
module.exports.review=async (req, res) => {
    const { id } = req.params;
    const { comment, rating } = req.body.review;
  
    const post = await listing.findById(id);
    if (!post) throw new ExpressError(404, "Listing not found");
  
    const newReview = new Review({ comment, rating });
    newReview.author=req.user._id;
    await newReview.save();
    console.log(newReview)
    post.reviews.push(newReview);
    await post.save();
    res.redirect(`/listing/${id}`);
  }

  module.exports.reviewdelete=async function(req,res){
    const {id ,reviewid}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})
    await Review.findByIdAndDelete(reviewid);
    console.log(id);
    res.redirect(`/listing/${id}`);
  }