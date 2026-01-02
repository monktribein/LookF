const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    group: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    parent: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ['men', 'women', 'junior', 'accessories', 'cosmetic'],
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null, // null => parent category; otherwise sub-category
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
      },
    ],
  },
  {
    timestamps: true,
  }
);

CategorySchema.index({ slug: 1 }, { unique: true });

CategorySchema.pre('validate', function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name);
  }
  if (this.slug) {
    this.slug = slugify(this.slug);
  }
  if (this.parent) {
    this.parent = this.parent.toLowerCase();
  }
  next();
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;