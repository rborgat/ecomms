const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");

exports.homePage = catchAsync(async (req, res, next) => {
  res.status(200).render("home", {
    title: "Home Page",

    user: {
      firstName: "Riccardo",
      lastName: "Borgat",
      image: "Riccar",
    },
  });
});

exports.productPage = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });

  res.status(200).render("detail", {
    title: "Overview Page",
    product,
    user: {
      firstName: "Riccardo",
      lastName: "Borgat",
      image: "Riccar",
    },
  });
});
