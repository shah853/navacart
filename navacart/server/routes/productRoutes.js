const express = require("express");
const {
  getProducts,
  searchProducts,
  vectorSearchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productcantroller");

const router = express.Router();

router.get("/search", searchProducts);
router.get("/vector-search", vectorSearchProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
