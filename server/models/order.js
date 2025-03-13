const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderNumber: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    availableQuantity: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;