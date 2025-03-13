const { MongoClient } = require('mongodb');
const OrderModel = require('../models/order');

const uri = process.env.mongodb_url;
const client = new MongoClient(uri);


const createOrder = async (req, res) => {
    console.log('Received body:', req.body); 
    const { orderNumber, name, price, availableQuantity, deliveryDate, user, items } = req.body;
    if(!user){
      return res.status(400).json({ message: 'Must Login to create an Order!'});
    }
    if (!orderNumber || !name || !price || !availableQuantity || !deliveryDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const order = {deliveryDate, items, user};
    try {
      const isUser = await UserModel.findOne({ _id: user });
      if(!isUser){
        return res.status(400).json({ message: 'User not found' });
      }
      const result = await OrderModel.create(order);
      return res.status(201).json({
        message: 'Order created successfully',
        result,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      return res.status(500).json({ message: 'Error creating order' });
    }
   
};

const getOrders = async (req, res)=>{
  try {
    const orders = req.user.role === "admin"
      ? await OrderModel.find().populate("user", "name email")
      : await OrderModel.find({ user: req.user.id });

     res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

const getOrder = async (req, res) => {
  try {
    const { role, id: userId } = req.user; 
    let order;
    if (role === "admin") {
      order = await OrderModel.findOne({ id: req.params.id });
    } else {
      order = await OrderModel.findOne({ id: req.params.id, user:userId });
    }
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const updateOrder = async (req, res) => {
  try {
    const { status, ...details } = req.body; 
    const { role, id: userId } = req.user;  // Assume `req.user` contains user's role and ID
    const orderId = req.params.id;


    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const isOwner = order.user.toString() === userId;

    if (role === "admin") {
      if (isOwner) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
          orderId,
          { status, ...details },
          { new: true }
        );
        return res.json(updatedOrder);
      } else {
        if (status) {
          const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
          );
          return res.json(updatedOrder);
        } else {
          return res.status(403).json({ message: "Admins can only update status for non-owned orders" });
        }
      }
    } else {
      if (isOwner) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
          orderId,
          { ...details },
          { new: true }
        );
        return res.json(updatedOrder);
      } else {
        return res.status(403).json({ message: "You are not authorized to update this order" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
      const { role, id: userId } = req.user;
      const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const isOwner = order.user.toString() === userId;

    if(!isOwner){
      return res.status(403).json({ message: "You are not authorized to delete this order" });
    }
      const Order = await OrderModel.findByIdAndDelete(orderId);
      if (!Order) return res.status(404).json({ message: "Order not found" });
      res.json(Order);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };


module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder
};