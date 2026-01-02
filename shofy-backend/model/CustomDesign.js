const mongoose = require("mongoose");

const customDesignSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    baseImage: {
      type: String,
      required: true,
    },
    selectedColor: {
      type: String,
      required: false,
    },
    selectedSize: {
      type: String,
      required: false,
    },
    customText: {
      type: String,
      required: false,
    },
    previewImage: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "custom_designs",
  }
);

const CustomDesign =
  mongoose.models.CustomDesign ||
  mongoose.model("CustomDesign", customDesignSchema);
module.exports = CustomDesign;

