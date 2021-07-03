const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    shippingAddress: {
      type: Object,
    },
    total: {
      type: Number,
    },
    orderItems: {
      type: Object,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);




module.exports = Order;
