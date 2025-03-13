const mongoose = require('mongoose')
const {Schema} = mongoose
const { v4: uuidv4 } = require('uuid');

const UserSchema =new Schema({
    id:{
            type:String,
            default:uuidv4,
        },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{type:String,required:true}
})

const UserModel = mongoose.model('User',UserSchema)
module.exports = UserModel