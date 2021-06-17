const mongoose = require("mongoose");
const helper = require("../utils/helper");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
    trim: true,
  },
  slug: String,
  category: String,
  new: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  description: {
    type: String,
    required: [true, "A product must have a description"],
  },
  features: {
    type: String,
    required: [true, "A product must have the features listed"],
  },
  includes: {
    type: [{ quantity: String, item: String }],
  },
  image: { mobile: String, tablet: String, desktop: String },
  gallery: {
    first: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
    second: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
    third: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
  },
  others: [
    {
      slug: String,
      name: String,
      image: { mobile: String, tablet: String, desktop: String },
    },
  ],
});

productSchema.virtual("formattedPrice").get(function () {
  return helper.formatPrice(this.price);
});
/* productSchema.post(/^find/, function (docs, next) {
  docs.price = helper.formatPrice(docs.price);
  console.log(docs.price)
  next();
}); */
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
