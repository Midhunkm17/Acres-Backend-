const express=require('express')

//router object
const router=new express.Router()

const user=require('../Controllers/userControl')

const uploads = require('../middlewares/multerMiddleware')
const { jwtMiddleware } = require('../middlewares/jwtMiddleware')


//sign up
router.post('/user/signup',user.signup)

//login
router.post('/user/login',user.login)

//update-profile
router.put('/user/update-profile/:_id',jwtMiddleware,uploads.single('profileImage'),user.updateProfile)

//add-property
router.post('/user/add-property',jwtMiddleware,uploads.single('propertyImg'),user.addProperty)

//user property uploads
router.get('/user/my-properties/:id',jwtMiddleware,user.userProperty)

//all properties
router.get('/user/all-properties',user.allProperties)

//random properties
router.get('/home/home-properties',user.homeProperties)

//edit property
router.put('/user/edit-properties/:_id',jwtMiddleware,uploads.single('propertyImg'),user.editProperty)

//delete property
router.delete('/user/delete-property/:_id',jwtMiddleware,user.deleteProperty)

//get specified property
router.get('/user/view-property/:_id',jwtMiddleware,user.getSpecifiedProperty)
module.exports=router;