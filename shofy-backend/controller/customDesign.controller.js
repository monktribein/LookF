
const CustomDesign = require("../model/CustomDesign");

// POST /api/custom-designs
exports.createCustomDesign = async (req, res, next) => {
  try {
    const {
      userId,
      productId,
      baseImage,
      selectedColor,
      selectedSize,
      customText,
      previewImage,
    } = req.body || {};

    if (!productId || !baseImage) {
      return res.status(400).json({
        success: false,
        message: "productId and baseImage are required",
      });
    }

    const design = await CustomDesign.create({
      userId: userId || null,
      productId,
      baseImage,
      selectedColor: selectedColor || "",
      selectedSize: selectedSize || "",
      customText: customText || "",
      previewImage: previewImage || "",
    });

    return res.status(201).json({
      success: true,
      customDesignId: design._id,
      data: design,
      message: "Design saved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to save design",
    });
  }
};

// GET /api/custom-designs/:id
exports.getCustomDesign = async (req, res, next) => {
  try {
    const design = await CustomDesign.findById(req.params.id);
    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Custom design not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: design,
    });
  } catch (error) {
    next(error);
  }
};

