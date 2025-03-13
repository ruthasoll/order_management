const express = require("express");
const { createOrder, getOrder, getOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth(), createOrder);
router.put("/:id", auth(), updateOrder);
router.get("/", auth(), getOrders);
router.get("/:id", auth(), getOrder);
router.delete("/:id", auth(), deleteOrder);

module.exports = router;
 