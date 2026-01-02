const categoryServices = require("../services/category.service");

// create category
exports.createCategory = async (req, res, next) => {
  try {
    const result = await categoryServices.createCategoryService(req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get categories with filters
exports.getCategories = async (req, res, next) => {
  try {
    const result = await categoryServices.getCategoriesService(req.query || {});
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get subcategories by parent category id
exports.getSubCategories = async (req, res, next) => {
  try {
    const result = await categoryServices.getSubCategoriesService(req.params.id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// update category (enable/disable/name change)
exports.updateCategory = async (req, res, next) => {
  try {
    const result = await categoryServices.updateCategoryService(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// delete category
exports.deleteCategory = async (req, res, next) => {
  try {
    const result = await categoryServices.deleteCategoryService(req.params.id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get single category
exports.getSingleCategory = async (req, res, next) => {
  try {
    const result = await categoryServices.getSingleCategoryService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};