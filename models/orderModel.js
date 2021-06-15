const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    date: Date,
    orderNumber: {
      type: String,
      require: [true, "Order must an order number"],
    },
    total: {
      type: Number,
      required: [true, "Order must have a total"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* orderSchema.virtual("orderItems", {
  ref: "OrderItem",
  foreignField: "order",
  localField: "_id",
});
 */
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
