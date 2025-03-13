const OrderModel = require("../models/order");
const UserModel = require("../models/users");
const ProductModel = require("../models/products");

const createOrder = async (req, res) => {
  const { deliveryDate, items } = req.body;
  const user = req.user;

  if (!items || items.length === 0) {
    return res
      .status(400)
      .json({ message: "Order must contain at least one item" });
  }

  const order = { deliveryDate, items, user };
  try {
    const isUser = await UserModel.findOne({ id: user.id });
    if (!isUser) {
      return res.status(400).json({ message: "User not found" });
    }
    order.user = isUser;

    const new_items = [];
    for (const item of items) {
      const product = await ProductModel.findOne({ id: item.product });
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product with ID ${item.product} not found` });
      }
      if (item.quantity > product.avaliableQnty) {
        return res.status(400).json({
          message: `Insufficient quantity for product ${product.name}`,
        });
      }
      product.avaliableQnty -= item.quantity;
      await product.save();
      new_items.push({ product: product, quantity: item.quantity });
    }
    order.items = new_items;
    const result = await OrderModel.create(order);
    return res.status(201).json({
      message: "Order created successfully",
      result,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Error creating order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "name email")
      .populate("items.product", "name price");
    res.json(orders);
  } catch (error) {
    console.log(`error`, error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await OrderModel.findOne({ id: req.params.id })
      .populate("user", "name email")
      .populate("items.product", "name price");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { status, ...details } = req.body;
    const orderId = req.params.id;

    const order = await OrderModel.findOne({ id: orderId }).populate(
      "items.product"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status && status === "canceled" && order.status !== "canceled") {
      for (const item of order.items) {
        const product = await ProductModel.findById(item.product);
        product.avaliableQnty += item.quantity;
        await product.save();
      }
    }
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { id: orderId },
      { status, ...details },
      { new: true }
    );
    return res.json(updatedOrder);
  } catch (error) {
    console.log(`error`, error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrderModel.findOne({ id: orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    for (const item of order.items) {
      const product = await ProductModel.findById(item.product);
      product.avaliableQnty += item.quantity;
      await product.save();
    }

    const deletedOrder = await OrderModel.findOneAndDelete({ id: orderId });
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });
    res.json(deletedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
