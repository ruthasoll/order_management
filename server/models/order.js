const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const orderSchema = new Schema({
    id:{
            type:String,
            default:uuidv4,
            unique:true,
        },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, default:1 }, 
        },
    ],
    status: { 
        type: String, 
        enum: ["pending", "done", "canceled"],
        required: true, 
        default: "pending" 
    },
    // price: { type: Number, required: true },
    // availableQuantity: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
});

const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;