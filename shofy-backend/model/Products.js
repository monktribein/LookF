const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
// schema design
const validator = require("validator");

const productsSchema = mongoose.Schema({
  sku: {
    type: String,
    required: false,
  },
  img:{
    type: String,
    required: true,
    validate: [validator.isURL, "Please provide valid url(s)"]
  },
  title: {
    type: String,
    required: [true, "Please provide a name for this product."],
    trim: true,
    minLength: [3, "Name must be at least 3 characters."],
    maxLength: [200, "Name is too large"],
  },
  slug: {
    type: String,
    trim: true,
    required: false,
  },
  unit: {
    type: String,
    required: true,
  },
  imageURLs: [{
    color:{
      name:{
        type: String,
        required: false,
        trim: true,
      },
      clrCode:{
        type: String,
        required: false,
        trim: true,
      }
    },
    img:{
      type: String,
      required: false,
      validate: [validator.isURL, "Please provide valid url(s)"]
    },
    sizes:[String]
  }],
  parent: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    enum: ['men', 'women', 'junior', 'accessories', 'cosmetic'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  categorySlug: {
    type: String,
    required: [true, "Category slug is required"],
    trim: true,
    lowercase: true,
  },
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Sub-category is required"],
  },
  subCategorySlug: {
    type: String,
    required: [true, "Sub-category slug is required"],
    trim: true,
    lowercase: true,
  },
  subCategoryName: {
    type: String,
    required: true,
    trim: true,
  },
  children: {
    type: String,
    required: false,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Product price can't be negative"]
  },
  discount: {
    type: Number,
    min: [0, "Product price can't be negative"]
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Product quantity can't be negative"]
  },
  brand: {
    name: {
      type: String,
      required: false,
    },
    id: {
      type: ObjectId,
      ref: "Brand",
      required: false,
    }
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["active", "inactive"],
      message: "status can't be {VALUE} "
    },
    default: "active",
  },
  reviews: [{type:ObjectId, ref: 'Reviews' }],
  productType:{
    type:String,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true
  },
  videoId: {
    type: String,
    required: false
  },
  additionalInformation: [{}],
  tags: [String],
  sizes: [String],
  offerDate:{
    startDate:{
      type:Date
    },
    endDate:{
      type:Date
    },
  },
  currency: {
    type: String,
    default: "INR",
    trim: true,
  },
  mainCategory: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
  },
  subCategory: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
  },
  gender: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
  },
  stock: {
    type: Number,
    required: false,
    min: 0,
  },
  isNewArrival: {
    type: Boolean,
    default: false,
  },
  isCustomerFavorite: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  sellCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
})


const Products = mongoose.model('Products', productsSchema)

module.exports = Products;