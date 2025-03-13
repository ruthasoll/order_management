    const express = require('express')
    const dotenv = require('dotenv').config()
    const cors = require('cors')
    const {mongoose }=require('mongoose')
    const cookieParser = require('cookie-parser')
    mongoose.connect(process.env.mongodb_url)
    .then(()=>console.log('database is connected successfully'))
    .catch((err)=> console.log('database is not connected' ,err))

    const app = express()
    app.use(express.json());
    app.use(cookieParser())
    app.use(express.urlencoded({extended:false}))
    app.use(cors());
    const port = 8000
    app.use('/', require('./routes/authRoute'))

    // app.post('/api/logout', (req, res) => {
    //     const { token } = req.body; // Get token from the request body
    //     if (token) {
    //         blacklistedTokens.push(token); // Add token to blacklist
    //         res.json({ message: 'Logged out successfully' });
    //     } else {
    //         res.status(400).json({ message: 'Token is required to log out' });
    //     }
    // });

   
    app.listen(port,()=>{
        console.log(`server is running on ${port}`)
    })