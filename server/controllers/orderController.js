const { MongoClient } = require('mongodb');
const OrderModel = require('../models/order');

const uri = process.env.mongodb_url;
const client = new MongoClient(uri);
let isConnected = false;

const orderPost = async (req, res) => {
    console.log('Received body:', req.body); // Log the incoming request body

    const { orderNumber, name, price, availableQuantity, deliveryDate } = req.body;

    // Check if any of the required fields are missing
    if (!orderNumber || !name || !price || !availableQuantity || !deliveryDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    // You can add further validation and processing here
  
    // Simulate saving the order to a database (this part depends on your database setup)
    // For now, we'll just return the received data in the response
    const order = { orderNumber, name, price, availableQuantity, deliveryDate };
  
    // Send back the received data with a success message
    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
};

module.exports = {
    orderPost
};