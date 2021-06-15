const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product", 
      required: [true, "Item must have a product id"],
    },
    date: Date,
    quantity: {
      type: Number,
      required: [true, "Item quantity must be greater than 0"],
    },
    purchasedPrice: {
      type: Number,
      required: [true, "Item must have a purchased price"],
    },
    order: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
      required: [true, "Item must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

 orderItemSchema.pre(/^find/, function(next){
    this.populate({
        path: 'product', 
        select: "name image price"
    })
    next(); 
}) 
const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;
