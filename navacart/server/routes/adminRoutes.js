const express = require("express");
const { protect } = require("../middleware/authmiddleware");
const adminOnly = require("../middleware/adminmiddleware");
const {
	getAllOrders,
	updateOrderStatus,
	updatePaymentStatus,
	getDashboardStats,
	getAllProducts,
	getAllCustomers,
} = require("../controllers/adminController");

const router = express.Router();

router.use(protect, adminOnly);
router.get("/stats", getDashboardStats);
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);
router.put("/orders/:id/payment", updatePaymentStatus);
router.get("/products", getAllProducts);
router.get("/customers", getAllCustomers);

module.exports = router;
