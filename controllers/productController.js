const Product = require("../models/productModel"); 
const catchAsync = require("../utils/catchAsync"); 
const AppError = require("../utils/appError")

exports.getAllProducts = catchAsync(async(req, res, next) =>{
    const products = await Product.find(); 

    res.status(200).json({
        status: "success", 
        items: products.length,
        products, 
    })
})

exports.getProduct = catchAsync(async(req, res, next) => {

    const product = await Product.find({slug: req.params.slug})

    res.status(200).json({
        status: "success", 
        items: product.length,
        product, 
    })

})
/* exports.updateProduct = catchAsync(async(req, res, next) => {
    const product = await Product.findByIdAndUpdate({slug: req.params.slug});

    if(!product){
        return next(new AppError("product does not exist", 400)); 
    }

    
}) */