const express =  require('express')
const router =express.Router()
const cors =  require('cors')
const {test,signupUser}=require('../controllers/authController')


router.use(cors(
    {
        credentials:true,
        origin:'http://localhost:5174'
    }
))
router.post('/signup',signupUser)
router.get('/',test)
 module.exports = router