const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");
// internal
const categoryController = require('../controller/category.controller');

// list categories with optional parent/isActive filters
router.get('/', categoryController.getCategories);
// get single category
router.get('/:id', categoryController.getSingleCategory);
// get subcategories for a parent category
router.get('/:id/subcategories', categoryController.getSubCategories);
// create category (admin only)
router.post('/', verifyToken, authorization("admin","super-admin"), categoryController.createCategory);
// update category (enable/disable/rename)
router.patch('/:id', verifyToken, authorization("admin","super-admin"), categoryController.updateCategory);
// delete category
router.delete('/:id', verifyToken, authorization("admin","super-admin"), categoryController.deleteCategory);

module.exports = router;