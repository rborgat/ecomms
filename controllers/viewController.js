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

exports.overviewPage = catchAsync(async (req, res, next) => {
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

exports.convertToUpperCase = (req, res, next) => {
  if (req.params.title) {
    let firstLetter = req.params.title.split("")[0].toUpperCase();
    req.body.productTitle =
      firstLetter + req.params.title.split("").slice(1).join("");
  }
  next();
};
exports.productPage = catchAsync(async (req, res, next) => {
  const products = await Product.find({ category: req.params.title });

  res.status(200).render("product", {
    title: req.body.productTitle,
    productTitle: req.body.productTitle,
    products,
    user: {
      firstName: "Riccardo",
      lastName: "Borgat",
      image: "Riccar",
    },
  });
});

exports.checkoutPage = (req, res, next) => {
  res.status(200).render("checkout", {
    title: "Checkout",
    user: {
      firstName: "Riccardo",
      lastName: "Borgat",
      image: "Riccar",
    },
  });
};
