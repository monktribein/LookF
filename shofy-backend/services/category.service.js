const ApiError = require('../errors/api-error');
const Category = require('../model/Category');
const slugify = require('../utils/slugify');

// create category service (supports parent and sub-category via parentCategory)
exports.createCategoryService = async (data) => {
  const name = (data.name || "").trim();
  const parent = (data.parent || "").toLowerCase();
  const group = (data.group || "").trim().toLowerCase();
  const parentCategoryId = data.parentCategory || null;

  if (!name) {
    throw new ApiError(400, "Category name is required");
  }

  if (!["men", "women", "junior", "accessories", "cosmetic"].includes(parent)) {
    throw new ApiError(400, "Parent must be one of men, women, junior, accessories or cosmetic");
  }

  if (!group) {
    throw new ApiError(400, "Group is required");
  }

  const slug = slugify(data.slug || name);

  const exists = await Category.findOne({ slug });
  if (exists) {
    throw new ApiError(409, "Category slug already exists");
  }

  // if sub-category, ensure parentCategory exists and matches parent slug
  let parentCategoryDoc = null;
  if (parentCategoryId) {
    parentCategoryDoc = await Category.findById(parentCategoryId);
    if (!parentCategoryDoc) {
      throw new ApiError(404, "Parent category not found");
    }
    if (parentCategoryDoc.parent !== parent) {
      throw new ApiError(400, "Parent slug mismatch with parentCategory");
    }
  }

  const category = await Category.create({
    name,
    slug,
    parent,
    group,
    parentCategory: parentCategoryDoc ? parentCategoryDoc._id : null,
    isActive: data.isActive !== undefined ? data.isActive : true,
  });
  return category;
};

// list categories with filters
exports.getCategoriesService = async (filters = {}) => {
  const query = {};
  if (filters.parent) {
    query.parent = filters.parent.toLowerCase();
  }
  if (typeof filters.isActive !== "undefined") {
    const wantActive =
      filters.isActive === true ||
      filters.isActive === "true" ||
      filters.isActive === "1";
    query.isActive = wantActive ? { $ne: false } : false;
  }
  if (filters.parentCategory) {
    query.parentCategory = filters.parentCategory;
  }
  const categories = await Category.find(query).sort({ name: 1 });
  return categories;
};

// list subcategories by parent category id
exports.getSubCategoriesService = async (parentCategoryId) => {
  const parentCat = await Category.findById(parentCategoryId);
  if (!parentCat) {
    throw new ApiError(404, "Parent category not found");
  }
  let subs = await Category.find({
    parentCategory: parentCategoryId,
    isActive: { $ne: false },
  }).sort({ name: 1 });

  // Fallback: if no explicit parentCategory links, return categories that share the same parent slug but are not the parent itself
  if (!subs.length) {
    subs = await Category.find({
      _id: { $ne: parentCategoryId },
      parent: parentCat.parent,
      isActive: { $ne: false },
    }).sort({ name: 1 });
  }

  return subs;
};

// update category
exports.updateCategoryService = async (id, payload) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, 'Category not found !');
  }

  if (payload.name) {
    category.name = payload.name;
  }
  if (payload.slug) {
    category.slug = slugify(payload.slug);
  }
  if (payload.parent) {
    category.parent = payload.parent.toLowerCase();
  }
  if (typeof payload.isActive === "boolean") {
    category.isActive = payload.isActive;
  }

  await category.save();
  return category;
};

// delete category
exports.deleteCategoryService = async (id) => {
  const result = await Category.findByIdAndDelete(id);
  return result;
};

// get single category
exports.getSingleCategoryService = async (id) => {
  const result = await Category.findById(id);
  return result;
};