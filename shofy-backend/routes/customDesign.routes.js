const express = require("express");
const {
  createCustomDesign,
  getCustomDesign,
} = require("../controller/customDesign.controller");

const router = express.Router();

router.post("/", createCustomDesign);
router.get("/:id", getCustomDesign);

module.exports = router;

