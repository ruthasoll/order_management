const mongoose = require('mongoose')
const {Schema} = mongoose
const { v4: uuidv4 } = require('uuid');

const ProductSchema =new Schema({
    id:{
        type:String,
        default:uuidv4,
    },
    name:{
        type:String,
        required:true,
            },
    price:{
        type:Number,
        required:true
    },
    productImage:String,
    avaliableQnty:{type:Number,required:true},
})

const ProductModel= mongoose.model('Product',ProductSchema)
module.exports = ProductModel