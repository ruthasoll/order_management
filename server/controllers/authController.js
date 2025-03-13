// const User = require("../models/users");
// const {comparePassword, hashPassword}=require('../encryption/encrpt')
// const jwt =require('jsonwebtoken')
// const test = (req, res) =>{
//     res.json('this is for testing')
// }

// const signupUser = async(req,res) =>{
//     console.log('Request Body:', req.body);
//         try {
//             const {name, email,password} = req.body;
//             if(!name){
//                  return res.json({error:'name is required'})
//             }
//             if(!password || password.length<8){
//                 return res.json({
//                     error:'password is requires and must at leeast be 8 lengths long'
//                 })
//             }
//             const exist =await  User.findOne({email})
//             if(exist){
//                 res.json({error:'this email is already taken'})
//             }
            
//             const hashedPassword = await hashPassword(password)
//             const user = await User.create({name, email ,password:hashedPassword,})
//             return res.json(user) 
               
//             }
//          catch (error) {
//             return res.status(500).json({ error: 'An error occurred during signup' });
//         }
    
//     }

//     const loginUser = async(req,res)=>{
//         try {
//             const {email,password}=req.body
//             console.log('Email:', email);
//             const user = await User.findOne({email})
//             if(!user){
//                 return res.json({
//                     error:'No user found'
//                 })
//             }
//             const match = await comparePassword(password,user.password)
//             if(match){
//                 res.json({
//                     message:'passwords match'
//                 })
//             }else {
//                 res.json({
//                     error: 'Invalid password'
//                 });
//             }
//         } catch (error) {
//             return res.status(500).json({ error: 'An error occurred during login' });
//         }
//     }
// module.exports = {
//     test,signupUser,loginUser
// }


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");

const signupUser = async (req, res) => {
  const { name, email, password, role, adminsecret } = req.body;

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminSecret = "iam-admin";
    if (role === "admin" && adminSecret !== adminsecret)
      return res.status(400).json({ message: "Invalid admin secret" });
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "No user found for this email address" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
    signupUser,loginUser
}