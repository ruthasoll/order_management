const User = require("../models/users");
const {comparePassword, hashPassword}=require('../encryption/encrpt')

const test = (req, res) =>{
    res.json('this is for testing')
}

const signupUser = async(req,res) =>{
    console.log('Request Body:', req.body);
        try {
            const {name, email,password} = req.body;
            if(!name){
                 return res.json({error:'name is required'})
            }
            if(!password || password.length<8){
                return res.json({
                    error:'password is requires and must at leeast be 8 lengths long'
                })
            }
            const exist =await  User.findOne({email})
            if(exist){
                res.json({error:'this email is already taken'})
            }
            
            const hashedPassword = await hashPassword(password)
            const user = await User.create({name, email ,password:hashedPassword,})
            return res.json(user) 
               
            }
         catch (error) {
            return res.status(500).json({ error: 'An error occurred during signup' });
        }
    
    }
module.exports = {
    test,
    signupUser
}