const joi = require("joi");

module.exports.listingSchema = joi.object({
  list: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    location: joi.string().required(),
    country: joi.string().required(),
    price: joi.number().min(10).required(),
    image: joi.object({                // <-- change from string to object
      url: joi.string().uri().allow("").default("https://images.unsplash.com/photo-1759776037670-8290e9bf0524?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"),
      filename: joi.string().default("listingimage")
    }).required()
  }).required()
});
