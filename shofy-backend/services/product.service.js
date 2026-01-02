const Brand = require("../model/Brand");
const Category = require("../model/Category");
const Product = require("../model/Products");
const slugify = require("../utils/slugify");
const ApiError = require("../errors/api-error");

const buildStatusQuery = (statusValue = "active") => {
  if (statusValue === "active") {
    return {
      $or: [
        { status: "active" },
        { status: { $exists: false } },
        { status: "in-stock" },
      ],
    };
  }
  if (statusValue === "inactive") {
    return { status: { $in: ["inactive", "out-of-stock", "discontinued"] } };
  }
  return {};
};

// create product service
exports.createProductService = async (data) => {
  const categoryId = data.category;
  const subCategoryId = data.subCategory;
  if (!categoryId || !subCategoryId) {
    throw new ApiError(400, "Category and sub-category are required");
  }

  const categoryDoc = await Category.findById(categoryId);
  const subCategoryDoc = await Category.findById(subCategoryId);

  if (!categoryDoc || categoryDoc.isActive === false) {
    throw new ApiError(404, "Category not found or inactive");
  }
  if (!subCategoryDoc || subCategoryDoc.isActive === false) {
    throw new ApiError(404, "Sub-category not found or inactive");
  }
  if (
    subCategoryDoc.parentCategory?.toString() !== categoryDoc._id.toString() ||
    subCategoryDoc.parent !== categoryDoc.parent
  ) {
    throw new ApiError(400, "Sub-category does not belong to the selected category");
  }

  const payload = {
    ...data,
    category: categoryDoc._id,
    categorySlug: categoryDoc.slug,
    categoryName: categoryDoc.name,
    subCategory: subCategoryDoc._id,
    subCategorySlug: subCategoryDoc.slug,
    subCategoryName: subCategoryDoc.name,
    parent: categoryDoc.parent,
    status: data.status || "active",
  };

  const product = await Product.create(payload);
  const { _id: productId, brand } = product;

  if (brand?.id) {
    await Brand.updateOne({ _id: brand.id }, { $push: { products: productId } });
  }

  await Category.updateOne(
    { _id: categoryDoc._id },
    { $addToSet: { products: productId } }
  );
  await Category.updateOne(
    { _id: subCategoryDoc._id },
    { $addToSet: { products: productId } }
  );

  return product;
};

// create all product service
exports.addAllProductService = async (data) => {
  await Product.deleteMany();
  const products = await Product.insertMany(data);
  for (const product of products) {
    if (product.brand?.id) {
    await Brand.findByIdAndUpdate(product.brand.id, {
      $push: { products: product._id },
    });
    }
    if (product.category) {
      await Category.findOneAndUpdate(
        { slug: product.category },
        { $addToSet: { products: product._id } }
      );
    }
  }
  return products;
};

// get product data
exports.getAllProductsService = async (filters = {}) => {
  const { category, subcategory, status, parent } = filters || {};
  const query = {};

  if (category) {
    query.categorySlug = slugify(category);
  }
  if (subcategory) {
    query.subCategorySlug = slugify(subcategory);
  }
  if (parent) {
    query.parent = parent.toLowerCase();
  }

  Object.assign(query, buildStatusQuery(status || "active"));

  const products = await Product.find(query).populate("reviews");
  return products;
};

// get type of product service
const normalizeMainCategory = (parent = "", fallback = "") => {
  const val = (fallback || parent || "").toLowerCase();
  if (val.includes("t-shirt")) return "tshirts";
  if (val.includes("shirt")) return "shirts";
  if (val.includes("bottom")) return "bottom-wear";
  return fallback || parent || "";
};

const normalizeSubCategory = (children = "", fallback = "") => {
  const val = (fallback || children || "").toLowerCase();
  return val.replace(/\s+/g, "-");
};

exports.getProductTypeService = async (req) => {
  const type = req.params.type;
  const query = req.query;
  const baseQuery = { productType: type, ...buildStatusQuery("active") };

  if (query.featured === "true") {
    baseQuery.featured = true;
  }

  if (query.customerFavorite === "true") {
    baseQuery.isCustomerFavorite = true;
  }

  if (query.new === "true") {
    baseQuery.$or = [{ isNewArrival: true }, { isNewArrival: { $exists: false } }];
  }

  let cursor = Product.find(baseQuery).populate("reviews");
  if (query.new === "true") {
    cursor = cursor.sort({ createdAt: -1 }).limit(8);
  } else if (query.topSellers === "true") {
    cursor = cursor.sort({ sellCount: -1 }).limit(8);
  }

  const raw = await cursor;

  return raw.map((p) => {
    const obj = p.toObject ? p.toObject() : p;
    obj.mainCategory = obj.mainCategory || normalizeMainCategory(obj.parent);
    obj.subCategory =
      obj.subCategory || normalizeSubCategory(obj.children || obj.tags?.[0]);
    if (typeof obj.stock !== "number") obj.stock = obj.quantity || 0;
    if (!obj.currency) obj.currency = "INR";
    return obj;
  });
};

// get offer product service
exports.getOfferTimerProductService = async (query) => {
  const products = await Product.find({
    productType: query,
    "offerDate.endDate": { $gt: new Date() },
    ...buildStatusQuery("active"),
  }).populate("reviews");
  return products;
};

// get popular product service by type
exports.getPopularProductServiceByType = async (type) => {
  const products = await Product.find({ productType: type, ...buildStatusQuery("active") })
    .sort({ "reviews.length": -1 })
    .limit(8)
    .populate("reviews");
  return products;
};

exports.getTopRatedProductService = async () => {
  const products = await Product.find({
    reviews: { $exists: true, $ne: [] },
    ...buildStatusQuery("active"),
  }).populate("reviews");

  const topRatedProducts = products.map((product) => {
    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / product.reviews.length;

    return {
      ...product.toObject(),
      rating: averageRating,
    };
  });

  topRatedProducts.sort((a, b) => b.rating - a.rating);

  return topRatedProducts;
};

// get product data
exports.getProductService = async (id) => {
  const product = await Product.findById(id).populate({
    path: "reviews",
    populate: { path: "userId", select: "name email imageURL" },
  });
  return product;
};

// get product data
exports.getRelatedProductService = async (productId) => {
  const currentProduct = await Product.findById(productId);

  const relatedProducts = await Product.find({
    category: currentProduct.category,
    _id: { $ne: productId }, // Exclude the current product ID
    ...buildStatusQuery("active"),
  });
  return relatedProducts;
};

// update a product
exports.updateProductService = async (id, currProduct) => {
  // console.log('currProduct',currProduct)
  const product = await Product.findById(id);
  if (product) {
    // handle parent category
    if (currProduct.category) {
      const categoryDoc = await Category.findById(currProduct.category);
      if (categoryDoc) {
        product.category = categoryDoc._id;
        product.categorySlug = categoryDoc.slug;
        product.categoryName = categoryDoc.name;
        product.parent = categoryDoc.parent;
      }
    }
    // handle sub-category
    if (currProduct.subCategory) {
      const subCategoryDoc = await Category.findById(currProduct.subCategory);
      if (subCategoryDoc) {
        product.subCategory = subCategoryDoc._id;
        product.subCategorySlug = subCategoryDoc.slug;
        product.subCategoryName = subCategoryDoc.name;
      }
    }
    product.title = currProduct.title;
    product.brand.name = currProduct.brand.name;
    product.brand.id = currProduct.brand.id;
    product.sku = currProduct.sku;
    product.img = currProduct.img;
    product.slug = currProduct.slug;
    product.unit = currProduct.unit;
    product.imageURLs = currProduct.imageURLs;
    product.tags = currProduct.tags;
    product.children = currProduct.children;
    product.price = currProduct.price;
    product.discount = currProduct.discount;
    product.quantity = currProduct.quantity;
    product.status = currProduct.status || product.status;
    product.productType = currProduct.productType;
    product.description = currProduct.description;
    product.additionalInformation = currProduct.additionalInformation;
    product.offerDate.startDate = currProduct.offerDate.startDate;
    product.offerDate.endDate = currProduct.offerDate.endDate;

    await product.save();
  }

  return product;
};



// get Reviews Products
exports.getReviewsProducts = async () => {
  const result = await Product.find({
    reviews: { $exists: true, $ne: [] },
    ...buildStatusQuery("active"),
  })
    .populate({
      path: "reviews",
      populate: { path: "userId", select: "name email imageURL" },
    });

  const products = result.filter(p => p.reviews.length > 0)

  return products;
};

// get Reviews Products
exports.getStockOutProducts = async () => {
  const result = await Product.find({ status: "inactive" }).sort({ createdAt: -1 })
  return result;
};

// get Reviews Products
exports.deleteProduct = async (id) => {
  const result = await Product.findByIdAndDelete(id)
  return result;
};