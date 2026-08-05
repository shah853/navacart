const express = require("express");
const { protect } = require("../middleware/authmiddleware");
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  checkoutOrder,
  trackOrder,
} = require("../controllers/ordercantroller");

const router = express.Router();

router.use(protect);
router.get("/", getOrders);
router.post("/checkout", checkoutOrder);
router.get("/track/:id", trackOrder);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
