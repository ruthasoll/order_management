const express =  require('express')
const router =express.Router()
const cors =  require('cors')
const {test,signupUser,loginUser}=require('../controllers/authController')
const { orderPost } = require('../controllers/orderController')

router.use(cors(
    {
        credentials:true,
        origin:'http://localhost:5174'
    }
))
router.post('/signup',signupUser)
router.post('/login', loginUser)
router.post('/postOrder', orderPost)
router.get('/',test)
 module.exports = router