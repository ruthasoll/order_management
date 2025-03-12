    const express = require('express')
    const dotenv = require('dotenv').config()
    const cors = require('cors')
    const {mongoose }=require('mongoose')

    mongoose.connect(process.env.mongodb_url)
    .then(()=>console.log('database is connected successfully'))
    .catch((err)=> console.log('database is not connected' ,err))

    const app = express()
    app.use(express.json());
    app.use(cors());
    const port = 8000
    app.use('/', require('./routes/authRoute'))

    app.listen(port,()=>{
        console.log(`server is running on ${port}`)
    })