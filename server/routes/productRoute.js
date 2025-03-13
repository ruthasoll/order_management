const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  createProduct,
  updateProduct,
  getProducts,
  getProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", auth(), createProduct);
router.put("/:id", auth(), updateProduct);
router.get("/", auth(), getProducts);
router.get("/:id", auth(), getProduct);
router.delete("/:id", auth(), deleteProduct);

module.exports = router;
