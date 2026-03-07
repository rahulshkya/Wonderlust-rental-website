const listing=require("./models/model.js");
const reviewSchema=require("./models/review.js");
const ExpressError=require("./utilis/ExpressError.js");
const Review=require("./models/review.js")

module.exports.islogged = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //redirect 
        req.session.redirectUrl=req.originalUrl;

        req.flash("error", "you must be logged in to create listing");
        return res.redirect("/login");
    }
    next();  // <-- VERY IMPORTANT
}

module.exports.saveRedirectUrl=function(req,res,next){
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner= async function(req,res,next){
    const {id}=req.params;
    const listings=await listing.findById(id);
  if (req.user && !listings.owner.includes(req.user._id)) {
    req.flash("error", "You are not authorized to edit this listing");
    return res.redirect(`/listing/${id}`);
}
next();
}

module.exports.validateReview= (req, res, next) => {
    const {error}=reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error.details[0].message);
    }
    next();
}

module.exports.isreviewAuthor = async function (req, res, next) {
    const { id, reviewid } = req.params;

    // Review fetch karo
    const review = await Review.findById(reviewid);

    // Agar review hi not found → error handle
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listing/${id}`);
    }

    // Agar author hi missing hai (rare but possible)
    if (!review.author) {
        req.flash("error", "Review does not have an author");
        return res.redirect(`/listing/${id}`);
    }

    // Check correct authorization
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not authorized to delete this review");
        return res.redirect(`/listing/${id}`);
    }

    next();
};
